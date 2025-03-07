import { useNavigation } from '@react-navigation/native';

// 在 Screens 对象中添加搜索页面
export const Screens = {
  MainTab: 'MainTab',
  Home: 'Home',
  Detail: 'Detail',
  // 添加三个标签页
  Search: 'Search',
  Favorite: 'Favorite',
  Profile: 'Profile',
  // 添加登录和注册页面
  Login: 'Login',
  Register: 'Register',
  WebView: 'WebView',
};

// 封装导航函数
export const useTypedNavigation = () => {
  const navigation = useNavigation();
  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName as never);
  };
  const goBack = () => {
    navigation.goBack();
  };
  return { navigateTo, goBack };
};