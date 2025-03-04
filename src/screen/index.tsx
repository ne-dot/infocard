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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{
          title: '首页',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name={Screens.Favorite}
        component={FavoriteScreen}
        options={{
          title: '收藏',
          tabBarIcon: FavoriteIcon,
        }}
      />
      <Tab.Screen
        name={Screens.Profile}
        component={ProfileScreen}
        options={{
          title: '我的',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

// 主导航栈
const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.MainTab}>
      <Stack.Screen
        name={Screens.MainTab}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Screens.Detail} component={DetailScreen} />
      <Stack.Screen
        name={Screens.Login}
        component={LoginScreen}
        options={{ title: '登录' }}
      />
      <Stack.Screen
        name={Screens.Register}
        component={RegisterScreen}
        options={{ title: '注册' }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
