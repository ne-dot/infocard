import axios, { AxiosRequestConfig } from 'axios';
import config from '../config';

// 从配置文件中获取API基础URL
const BASE_URL = config.API_URL;

// 创建axios实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求前做些什么，例如添加token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
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
      console.log(`请求超时，${delay}ms后重试，剩余重试次数: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(requestFn, retries - 1, delay * 1.5);
    }
    
    throw error;
  }
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
    return retryRequest(() => instance.get(url, { params, ...config }));
  },

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return retryRequest(() => instance.post(url, data, config));
  },

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return instance.put(url, data, config);
  },

  /**
   * DELETE请求
   * @param url 请求地址
   * @param config 请求配置
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.delete(url, config);
  },
};

export default api;
