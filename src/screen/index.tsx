import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { Screens } from './navigation';
import { useThemeColors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 添加类型定义
type IconProps = {
  color: string;
  size: number;
};

// Define tab icons outside of the component
const HomeIcon = ({ color, size }: IconProps) => <Icon name="home" size={size} color={color} />;
const FavoriteIcon = ({ color, size }: IconProps) => <Icon name="favorite" size={size} color={color} />;
const ProfileIcon = ({ color, size }: IconProps) => <Icon name="person" size={size} color={color} />;

const TabNavigator = () => {
  const colors = useThemeColors();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopWidth: 0, // 去掉顶部边框线
          elevation: 0, // 去掉 Android 上的阴影
          shadowOpacity: 0, // 去掉 iOS 上的阴影
        },
      }}
    >
      <Tab.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{
          title: '首页',
          tabBarIcon: HomeIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={Screens.Favorite}
        component={FavoriteScreen}
        options={{
          title: '收藏',
          tabBarIcon: FavoriteIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={Screens.Profile}
        component={ProfileScreen}
        options={{
          title: '我的',
          tabBarIcon: ProfileIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// 导入搜索页面
import SearchScreen from './SearchScreen';

// 主导航栈
const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.MainTab}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Screens.MainTab}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Screens.Detail} component={DetailScreen} />
      <Stack.Screen name={Screens.Search} component={SearchScreen} />
      <Stack.Screen name={Screens.Login} component={LoginScreen} />
      <Stack.Screen name={Screens.Register} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
