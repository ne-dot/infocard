import { create } from 'zustand';
import { GoogleResult } from '../types/search';

interface WebViewState {
  selectedResult: GoogleResult | null;
  setSelectedResult: (result: GoogleResult | null) => void;
}

export const useWebViewStore = create<WebViewState>((set) => ({
  selectedResult: null,
  setSelectedResult: (result) => set({ selectedResult: result }),
}));
