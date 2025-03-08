// 定义用户接口
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: number;
  lastLogin: number | null;
}

// 定义用户数据接口
export interface UserData {
  user_id: string;  // 改为小驼峰
  username: string;
  email: string;
  created_at: number;  // 改为小驼峰
  last_login: number | null;  // 改为小驼峰
}

// 定义登录响应数据接口
export interface LoginData {
  access_token: string;  // 登录token
  refresh_token: string;  // 刷新token
  token_type: string;
  expires_in: number;  // 过期时间
}
