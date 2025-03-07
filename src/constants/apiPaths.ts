// API路径常量
export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/users/register',  // 修改为正确的路径
    LOGIN: '/api/users/login',        // 可能也需要修改
    USER_INFO: '/api/users/me',       // 可能也需要修改
  },
  SEARCH: {
    SEARCH: '/api/search',
  },
  // 可以根据需要添加更多API路径分类
} as const;
