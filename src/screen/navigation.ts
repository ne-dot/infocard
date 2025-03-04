import { useNavigation } from '@react-navigation/native';

export const Screens = {
  Home: 'Home',
  Detail: 'Detail',
};

// 封装导航函数
export const useTypedNavigation = () => {
  const navigation = useNavigation();
  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName as never);
  };
  return { navigateTo };
};
