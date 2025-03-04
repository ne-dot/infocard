
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screens, useTypedNavigation } from './navigation';

const HomeScreen = () => {
  // 使用封装后的导航钩子
  const { navigateTo } = useTypedNavigation();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigateTo(Screens.Detail)}>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
