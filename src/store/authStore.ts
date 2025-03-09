import { create } from 'zustand';
import api from '../utils/api';
import { User, UserResponse, LoginData, AnonymousLoginResponse } from '../types/auth';
import { ApiResponse } from '../types/api';  // 导入新的类型
import { API_PATHS } from '../constants/apiPaths';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { storage } from '../utils/storage';

// 定义认证状态接口
// 在 AuthState 接口中修改 login 方法的签名
interface AuthState {
  // 用户信息
  user: User | null;
  // 认证令牌
  token: string | null;
  // 刷新令牌
  refreshToken: string | null;
  // 令牌过期时间
  expiresIn: number | null;
  // 令牌类型
  tokenType: string | null;
  // 加载状态
  loading: boolean;
  // 错误信息
  error: string | null;
  // 注册成功状态
  registerSuccess: boolean;
  // 登录状态
  isLogin: boolean;
  // 匿名登录id
  anonymousId: string | null;
  // 操作方法
  register: (username: string, password: string, email: string) => Promise<boolean>;
  login: (account: string, password: string, accountType: 'email' | 'username') => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<boolean>;
  clearError: () => void;
  clearRegisterSuccess: () => void;
  // 初始化方法
  initAuth: () => Promise<void>;
  anonymousLogin: () => Promise<void>;
}

// 创建认证状态存储
export const useAuthStore = create<AuthState>((set, get) => ({
  // 初始状态
  user: null,
  token: null,
  refreshToken: null,
  expiresIn: null,
  tokenType: null,
  loading: false,
  error: null,
  registerSuccess: false,
  isLogin: false,
  anonymousId: null,
  // 初始化认证状态
  initAuth: async () => {
    try {
      // 从存储中获取认证信息
      const accessToken = await storage.getItem<string>(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
      const refreshToken = await storage.getItem<string>(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
      const expiresIn = await storage.getItem<number>(STORAGE_KEYS.AUTH.EXPIRES_IN);
      const tokenType = await storage.getItem<string>(STORAGE_KEYS.AUTH.TOKEN_TYPE);
      // 如果有token，则更新状态
      if (accessToken && tokenType) {
        set({
          token: accessToken,
          refreshToken,
          expiresIn,
          tokenType,
          isLogin: true, // 设置登录状态为true
        });
        // 获取用户信息
        await get().fetchUserInfo();
      }
    } catch (error) {
      console.error('初始化认证状态失败:', error);
    }
  },
  // 注册方法
  register: async (username, password, email) => {
    console.log('register', username, password, email);
    set({ loading: true, error: null, registerSuccess: false });
    try {
      // 修改API路径，确保与后端接口一致
      const response = await api.post<ApiResponse<UserResponse>>(API_PATHS.AUTH.REGISTER, { username, email, password });
      // 解析返回的用户数据
      if (response.success && response.data) {
        // 更新用户信息，但不设置token（因为注册后还需要登录）
        set({
          loading: false,
          registerSuccess: true,
        });
      } else {
        set({ loading: false, registerSuccess: false });
        throw new Error(response.message || '注册失败');
      }
      return true;
    } catch (error: any) {
      console.error('注册失败:', error.message);
      set({
        error: error.response?.data?.message || error.message || '注册失败，请稍后重试',
        loading: false,
      });
      throw new Error(error.message || '注册失败');
    }
  },
  // 匿名登录方法
  anonymousLogin: async () => {
    try {
      // 检查是否已有匿名用户ID
      const anonymousId = await storage.getItem<string>(STORAGE_KEYS.AUTH.ANONYMOUS_ID);

      if (anonymousId) {
        // 如果已有匿名ID，直接设置状态为已匿名登录
        console.log('已存在匿名用户ID，设置匿名登录状态');
        set({
          anonymousId: anonymousId,
          loading: false,
        });
      } else {
        // 创建新的匿名用户
        const response = await api.post<AnonymousLoginResponse>('/api/users/anonymous-login');

        if (response.success) {
          // 保存匿名用户ID
          await storage.setItem(STORAGE_KEYS.AUTH.ANONYMOUS_ID, response.data.anonymous_id);
          // 保存用户信息
          set({
            isLogin: false,
            anonymousId: response.data.anonymous_id,
            user: response.data.user,
            loading: false,
          });
        } else {
          throw new Error(response.message || '匿名登录失败');
        }
      }
    } catch (error: any) {
      console.error('匿名登录失败:', error);
      set({
        loading: false,
        error: error.message || '匿名登录失败',
        anonymousId: null, // 确保失败时状态正确
      });
    }
  },

  // 修改现有的登录成功处理，在登录成功后清除匿名用户信息
  login: async (account: string, password: string, accountType: 'email' | 'username') => {
    set({ loading: true, error: null });
    try {
      // 构建登录参数
      const loginParams = accountType === 'email'
        ? { username_or_email: account, password }
        : { username_or_email: account, password };
      // 使用API常量和通用响应接口
      const response = await api.post<ApiResponse<LoginData>>(API_PATHS.AUTH.LOGIN, loginParams);
      if (response.success && response.data) {
        // 使用定义的接口类型来解构响应数据，注意属性名已改为小驼峰
        const { access_token, token_type, expires_in, refresh_token } = response.data;
        set({
          token: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in,
          tokenType: token_type,
          loading: false,
          isLogin: true, // 设置登录状态为true
          anonymousId: null, // 清除匿名用户ID
        });
        // 使用封装的storage工具和常量键保存token
        await storage.setItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN, access_token);
        await storage.setItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN, refresh_token);
        await storage.setItem(STORAGE_KEYS.AUTH.EXPIRES_IN, expires_in);
        await storage.setItem(STORAGE_KEYS.AUTH.TOKEN_TYPE, token_type);
        await storage.removeItem(STORAGE_KEYS.AUTH.ANONYMOUS_ID);
        return true;
      } else {
        throw new Error(response.message || '登录失败');
      }
    } catch (error: any) {
      console.error('登录失败:', error);
      set({
        error: error.response?.data?.message || error.message || '登录失败，请稍后重试',
        loading: false,
        isLogin: false, // 确保登录失败时状态为false
      });
      return false;
    }
  },
  // 获取用户信息方法
  fetchUserInfo: async () => {
    const { token } = get();
    if (!token) {
      console.error('获取用户信息失败: 未登录');
      return false;
    }
    try {
      // 使用API常量和通用响应接口，不需要手动传递token
      const response = await api.get<ApiResponse<UserResponse>>(API_PATHS.AUTH.USER_INFO);
      if (response.success && response.data) {
        // 将API返回的数据结构转换为应用中使用的User结构，注意属性名已改为小驼峰
        const user: User = {
          id: response.data.user_id,
          username: response.data.username,
          email: response.data.email,
          createdAt: response.data.created_at,
          lastLogin: response.data.last_login,
        };
        set({ user });
        return true;
      } else {
        throw new Error(response.message || '获取用户信息失败');
      }
    } catch (error: any) {
      console.error('获取用户信息失败:', error);
      return false;
    }
  },
  // 登出方法
  logout: async () => {
    // 使用封装的storage工具和常量键清除token
    await storage.removeItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
    await storage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
    await storage.removeItem(STORAGE_KEYS.AUTH.EXPIRES_IN);
    await storage.removeItem(STORAGE_KEYS.AUTH.TOKEN_TYPE);
    set({
      user: null,
      token: null,
      refreshToken: null,
      expiresIn: null,
      tokenType: null,
      isLogin: false, // 设置登录状态为false
    });
  },
  // 清除错误
  clearError: () => set({ error: null }),
  // 清除注册成功状态
  clearRegisterSuccess: () => set({ registerSuccess: false }),
}));

// 在应用启动时调用初始化方法
useAuthStore.getState().initAuth();
