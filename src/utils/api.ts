import axios, { AxiosRequestConfig } from 'axios';
import projectConfig from '../config';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

// 从配置文件中获取API基础URL
const BASE_URL = projectConfig.API_URL;

// 创建axios实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加请求日志
    console.log(`🚀 发送请求: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      params: config.params,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('❌ 请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 添加响应成功日志
    console.log(`✅ 响应成功: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 添加响应错误日志
    console.error(`❌ 响应错误: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      message: error.message,
      response: error.response?.data,
    });
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('请求错误:', error.response.status, error.response.data);
      // 处理401未授权错误
      if (error.response.status === 401) {
        // 可以在这里处理登出逻辑
        console.log('未授权，请重新登录');
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('网络错误，未收到响应');
    } else {
      // 在设置请求时发生了一些事情，触发了错误
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error);
  }
);

// 添加重试逻辑的辅助函数
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    // 如果是超时错误，等待一段时间后重试
    if (axios.isAxiosError(error) && error.message.includes('timeout')) {
      console.log(`🔄 请求超时，${delay}ms后重试，剩余重试次数: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(requestFn, retries - 1, delay * 1.5);
    }
    throw error;
  }
};

// 获取认证令牌的辅助函数
const getAuthHeader = async (): Promise<Record<string, string> | undefined> => {
  const token = await storage.getItem<string>(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return undefined;
};

// API请求方法
export const api = {
  /**
   * GET请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  get: async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    // 获取认证头
    const authHeader = await getAuthHeader();
    // 合并配置
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      params,
      headers: {
        ...config?.headers,
        ...authHeader,
      },
    };
    return retryRequest(() => instance.get(url, mergedConfig));
  },

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    // 获取认证头
    const authHeader = await getAuthHeader();
    // 合并配置
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...authHeader,
      },
    };
    return retryRequest(() => instance.post(url, data, mergedConfig));
  },

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    // 获取认证头
    const authHeader = await getAuthHeader();
    // 合并配置
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...authHeader,
      },
    };
    return instance.put(url, data, mergedConfig);
  },

  /**
   * DELETE请求
   * @param url 请求地址
   * @param config 请求配置
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    // 获取认证头
    const authHeader = await getAuthHeader();

    // 合并配置
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...authHeader,
      },
    };
    return instance.delete(url, mergedConfig);
  },
};

export default api;
