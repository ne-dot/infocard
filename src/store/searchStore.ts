import { create } from 'zustand';
import api from '../utils/api';
import { SearchResponse, GPTSummary, GoogleResult } from '../types/search';
import { API_PATHS } from '../constants/apiPaths';
import { ApiResponse } from '../types/api';

type SearchResponseData = ApiResponse<SearchResponse>;

// 定义搜索状态接口
interface SearchState {
  // 搜索查询
  query: string;
  // 搜索结果
  gptSummary: GPTSummary | null;
  googleResults: GoogleResult[];
  // 加载状态
  loading: boolean;
  // 思考状态
  thinking: boolean;
  // 错误信息
  error: string | null;
  // 操作方法
  setQuery: (query: string) => void;
  search: () => Promise<void>;
  clearResults: () => void;
}

// 创建搜索状态存储
export const useSearchStore = create<SearchState>((set, get) => ({
  // 初始状态
  query: '',
  gptSummary: null,
  googleResults: [],
  loading: false,
  thinking: false,
  error: null,
  // 设置搜索查询
  setQuery: (query) => set({ query }),
  // 执行搜索
  search: async () => {
    const { query } = get();
    if (!query.trim()) {
      set({ gptSummary: null, googleResults: [], error: null });
      return;
    }
    set({ loading: true, thinking: true, error: null });
    try {
      // 调用搜索API
      const response = await api.post<SearchResponseData>(API_PATHS.SEARCH.SEARCH, { query });

      if (response.success && response.data) {
        const { gpt_summary, google_results } = response.data;
        set({
          gptSummary: gpt_summary,
          googleResults: google_results,
          loading: false,
          thinking: false,
        });
      } else {
        throw new Error(response.message || '搜索失败');
      }
    } catch (error) {
      console.error('搜索失败:', error);
      set({
        error: '搜索失败，请稍后重试',
        loading: false,
        thinking: false,
      });
    }
  },
  // 清除搜索结果
  clearResults: () => set({ gptSummary: null, googleResults: [], error: null }),
}));
