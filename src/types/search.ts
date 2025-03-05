// 定义GPT摘要类型
export interface GPTSummary {
  id: string;
  title: string;
  content: string;
  date: string;
}

// 定义Google搜索结果类型
export interface GoogleResult {
  id: string;
  title: string;
  snippet: string;
  link: string;
  thumbnail_link: string | null;
  content_link: string;
  type: 'text' | 'image' | 'video' | string;
  date: string;
}

// 定义搜索响应类型
export interface SearchResponse {
  gpt_summary: GPTSummary;
  google_results: GoogleResult[];
}
