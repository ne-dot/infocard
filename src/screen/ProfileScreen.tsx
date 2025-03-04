import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTypedNavigation, Screens } from './navigation';

const ProfileScreen = () => {
  const { navigateTo } = useTypedNavigation();
  return (
    <View style={styles.container}>
      <Text>我的页面</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo(Screens.Login)}
      >
        <Text>去登录</Text>
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
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});

export default ProfileScreen;
