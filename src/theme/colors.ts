import { useColorScheme } from 'react-native';

// 定义主题颜色
export const Colors = {
  light: {
    background: '#F5F6F8',
    textBackground: '#ECEDF1',
    text: '#131823', // 这将作为白色模式下的选中颜色
    subText: '#20283B',
    searchBackground: '#E8E9EB',
    searchText: '#333333',
    searchPlaceholder: '#666666',
    iconColor: '#666666',
    tabBarBackground: '#ECEDF1',
    tabBarInactiveTintColor: '#79849E',
    primay: '#208CE3',
    border: '#e0e0e0',
  },
  dark: {
    background: '#0D1017',
    textBackground: '#131823',
    text: '#ECEDF1', // 这将作为黑色模式下的选中颜色
    subText: '#C5CAD6',
    searchBackground: '#2a2e3a',
    searchText: '#FFFFFF',
    searchPlaceholder: '#666666',
    iconColor: '#666666',
    tabBarBackground: '#131823',
    tabBarInactiveTintColor: '#657391',
    primay: '#208CE3',
    border: '#333333',
  },
};

// 创建一个钩子来获取当前主题颜色
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme === 'dark' ? 'dark' : 'light'];
};
