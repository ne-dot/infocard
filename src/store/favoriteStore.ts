import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleResult, GPTSummary } from '../types/search';

// 定义收藏项类型
export type FavoriteItem = {
  id: string;
  type: 'google' | 'gpt';
  data: GoogleResult | GPTSummary;
  timestamp: number;
};

// 定义收藏状态接口
interface FavoriteState {
  // 收藏列表
  favorites: FavoriteItem[];
  
  // 添加收藏
  addFavorite: (item: GoogleResult | GPTSummary, type: 'google' | 'gpt') => void;
  
  // 移除收藏
  removeFavorite: (id: string) => void;
  
  // 检查是否已收藏
  isFavorite: (id: string) => boolean;
}

// 创建收藏状态存储
export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      // 初始状态
      favorites: [],
      
      // 添加收藏
      addFavorite: (item, type) => {
        const { favorites } = get();
        const id = item.id;
        
        // 检查是否已经收藏
        if (favorites.some(fav => fav.id === id)) {
          return;
        }
        
        set({
          favorites: [
            ...favorites,
            {
              id,
              type,
              data: item,
              timestamp: Date.now(),
            },
          ],
        });
      },
      
      // 移除收藏
      removeFavorite: (id) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter(item => item.id !== id),
        });
      },
      
      // 检查是否已收藏
      isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some(item => item.id === id);
      },
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);