// 定义通用 API 响应接口
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

