import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/screen/';
import { LoadingProvider } from './src/components/Loading';

export default function App() {
  return (
    <LoadingProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
     </LoadingProvider>
  );
}
