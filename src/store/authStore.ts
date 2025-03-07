import { create } from 'zustand';
import api from '../utils/api';
import { User, UserInfoResponse, LoginResponse } from '../types/auth';
import { API_PATHS } from '../constants/apiPaths';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { storage } from '../utils/storage';

// 定义认证状态接口
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
  // 操作方法
  register: (username: string, password: string, email: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<boolean>;
  clearError: () => void;
  clearRegisterSuccess: () => void;
  // 初始化方法
  initAuth: () => Promise<void>;
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
      await api.post(API_PATHS.AUTH.REGISTER, { username, email, password });
      set({ loading: false, registerSuccess: true });
      return true;
    } catch (error: any) {
      console.error('注册失败:', error);
      set({
        error: error.response?.data?.message || '注册失败，请稍后重试',
        loading: false,
      });
      return false;
    }
  },
  // 登录方法
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // 使用API常量
      const response = await api.post<LoginResponse>(API_PATHS.AUTH.LOGIN, { email, password });
      // 使用定义的接口类型来解构响应数据
      const { accessToken, tokenType, expiresIn, refreshToken } = response;
      set({
        token: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
        tokenType: tokenType,
        loading: false,
      });
      // 使用封装的storage工具和常量键保存token
      await storage.setItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN, accessToken);
      await storage.setItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN, refreshToken);
      await storage.setItem(STORAGE_KEYS.AUTH.EXPIRES_IN, expiresIn);
      await storage.setItem(STORAGE_KEYS.AUTH.TOKEN_TYPE, tokenType);
      // 登录成功后获取用户信息
      await get().fetchUserInfo();
      return true;
    } catch (error: any) {
      console.error('登录失败:', error);
      set({
        error: error.response?.data?.message || '登录失败，请稍后重试',
        loading: false,
      });
      return false;
    }
  },
  // 获取用户信息方法
  fetchUserInfo: async () => {
    const { token, tokenType } = get();
    if (!token || !tokenType) {
      console.error('获取用户信息失败: 未登录');
      return false;
    }
    try {
      // 使用API常量
      const userResponse = await api.get<UserInfoResponse>(API_PATHS.AUTH.USER_INFO, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      // 将API返回的数据结构转换为应用中使用的User结构，注意属性名已改为小驼峰
      const user: User = {
        id: userResponse.userId,
        username: userResponse.username,
        email: userResponse.email,
        createdAt: userResponse.createdAt,
        lastLogin: userResponse.lastLogin,
      };
      set({ user });
      return true;
    } catch (error) {
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
    });
  },
  // 清除错误
  clearError: () => set({ error: null }),
  // 清除注册成功状态
  clearRegisterSuccess: () => set({ registerSuccess: false }),
}));

// 在应用启动时调用初始化方法
useAuthStore.getState().initAuth();
