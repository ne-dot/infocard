import { useColorScheme } from 'react-native';

// 定义主题颜色
export const Colors = {
  light: {
    background: '#FFFFFF', // 纯白背景，干净清爽
    textBackground: '#F2F4F8', // 轻微灰色，避免太刺眼
    text: '#0F172A', // 深蓝黑色，增强可读性
    subText: '#475569', // 柔和的灰蓝色，适合作为次要文本
    searchBackground: '#E2E8F0', // 浅灰蓝，区分搜索框
    searchText: '#1E293B', // 深色，确保可读性
    searchPlaceholder: '#64748B', // 低对比度灰蓝色，柔和但清晰
    iconColor: '#64748B', // 统一灰蓝色系，增强一致性
    tabBarBackground: '#F8FAFC', // 非纯白，减少视觉疲劳
    tabBarInactiveTintColor: '#94A3B8', // 低饱和蓝灰，柔和不突兀
    primary: '#2563EB', // 明亮的蓝色，突出交互元素
    border: '#E5E7EB', // 轻微灰色，增强层次感
    cardBackground: '#FFFFFF', // 纯白，卡片与背景融合但有阴影
  },
  dark: {
    background: '#0A0F1A', // 深蓝黑，减少纯黑带来的强烈对比
    textBackground: '#1E293B', // 深蓝灰，柔和护眼
    text: '#F1F5F9', // 近乎白色，提高对比度
    subText: '#94A3B8', // 柔和的灰蓝，减少视觉压力
    searchBackground: '#334155', // 深灰蓝，适合暗色模式
    searchText: '#E2E8F0', // 亮灰色，增强可读性
    searchPlaceholder: '#94A3B8', // 柔和灰色，避免过亮
    iconColor: '#94A3B8', // 统一灰蓝调，视觉和谐
    tabBarBackground: '#1E293B', // 深色但不至于太黑
    tabBarInactiveTintColor: '#64748B', // 柔和低对比度
    primary: '#3B82F6', // 亮蓝色，与暗色模式形成对比
    border: '#334155', // 深灰蓝，低调但有层次感
    cardBackground: '#1E293B', // 深蓝灰，与背景区分但不突兀
  },
};

// 创建一个钩子来获取当前主题颜色
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme === 'dark' ? 'dark' : 'light'];
};
