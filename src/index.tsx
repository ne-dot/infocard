import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './screen/';
import { LoadingProvider } from './components/Loading';

export default function App() { // 添加依赖项，避免无限循环
  return (
    <LoadingProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
     </LoadingProvider>
  );
}
