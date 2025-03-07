// 定义用户接口
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  lastLogin: string;
}

// 定义用户信息响应接口
export interface UserInfoResponse {
  userId: string;  // 改为小驼峰
  username: string;
  email: string;
  createdAt: string;  // 改为小驼峰
  lastLogin: string;  // 改为小驼峰
}

// 定义登录响应接口
export interface LoginResponse {
  accessToken: string;  // 改为小驼峰
  tokenType: string;    // 改为小驼峰
  expiresIn: number;    // 改为小驼峰
  refreshToken: string; // 改为小驼峰
}
