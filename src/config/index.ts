// 环境配置
const ENV = {
  development: {
    API_URL: 'http://127.0.0.1:8000',
  },
  production: {
    API_URL: 'http://127.0.0.1:8000', // 生产环境应该替换为实际的API地址
  },
  test: {
    API_URL: 'http://127.0.0.1:8000',
  },
};

// 当前环境，可以根据实际情况修改
const currentEnv = __DEV__ ? 'development' : 'production';

// 导出当前环境的配置
export const config = ENV[currentEnv];

export default config;
