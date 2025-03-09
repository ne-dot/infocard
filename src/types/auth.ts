// 定义用户接口
export interface User {
  id: string;
  username: string;
  email: string | null;
  createdAt: number;
  lastLogin: number | null;
  isAnonymous?: boolean; // 添加匿名用户标记
}

// 定义后端返回的用户数据接口
export interface UserResponse {
  user_id: string;
  username: string;
  email: string | null;
  created_at: number;
  last_login: number | null;
  is_anonymous?: boolean;
}

// 定义登录响应数据接口
export interface LoginData {
  access_token: string;  // 登录token
  refresh_token: string;  // 刷新token
  token_type: string;
  expires_in: number;  // 过期时间
}

// 定义匿名登录响应接口
export interface AnonymousLoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    anonymous_id: string;
  }
}
