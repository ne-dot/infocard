import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage 封装工具
export const storage = {
  // 存储数据
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('存储数据失败:', error);
      throw error;
    }
  },

  // 获取数据
  getItem: async <T>(key: string, defaultValue?: T): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return defaultValue || null;
      }
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    } catch (error) {
      console.error('获取数据失败:', error);
      return defaultValue || null;
    }
  },

  // 删除数据
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('删除数据失败:', error);
      throw error;
    }
  },

  // 清除所有数据
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('清除所有数据失败:', error);
      throw error;
    }
  },

  // 获取所有键
  getAllKeys: async (): Promise<readonly string[]> => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('获取所有键失败:', error);
      return [];
    }
  },
};
