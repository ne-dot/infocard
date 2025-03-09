// 存储键常量
export const STORAGE_KEYS = {
  AUTH: {
    ACCESS_TOKEN: 'auth.accessToken',
    REFRESH_TOKEN: 'auth.refreshToken',
    ANONYMOUS_ID: 'auth.anonymousId', // 添加匿名用户ID的键
    EXPIRES_IN: 'auth.expiresIn',
    TOKEN_TYPE: 'auth.tokenType',
  },
  USER: {
    PROFILE: 'user.profile',
  },
  // 可以根据需要添加更多存储键分类
} as const;