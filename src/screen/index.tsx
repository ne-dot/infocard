import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import { Screens } from './navigation';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.Home}>
      <Stack.Screen name={Screens.Home} component={HomeScreen} />
      <Stack.Screen name={Screens.Detail} component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
