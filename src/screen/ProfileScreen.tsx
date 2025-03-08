import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTypedNavigation, Screens } from './navigation';
import { useAuthStore } from '../store/authStore';
import { useThemeColors } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const { navigateTo } = useTypedNavigation();
  const colors = useThemeColors();
  // 从 authStore 获取登录状态和用户信息
  const { isLogin, user, logout } = useAuthStore();

  // 处理登出
  const handleLogout = async () => {
    await logout();
    // 可以添加登出成功的提示
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isLogin && user ? (
        // 已登录状态
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {/* 使用 Icon 替代 Image 组件 */}
            <Icon name="account-circle" size={100} color={colors.text} style={styles.avatar} />
          </View>
          <Text style={[styles.username, { color: colors.text }]}>{user.username}</Text>
          <Text style={[styles.email, { color: colors.subText }]}>{user.email}</Text>

          <View style={styles.infoContainer}>
            <View style={[styles.infoItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>用户ID</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{user.id}</Text>
            </View>
            <View style={[styles.infoItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>注册时间</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>最后登录</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '首次登录'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>退出登录</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 未登录状态
        <View style={styles.loginContainer}>
          <Text style={[styles.loginTitle, { color: colors.text }]}>您尚未登录</Text>
          <Text style={[styles.loginSubtitle, { color: colors.subText }]}>
            登录后可以查看和管理您的个人信息
          </Text>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primay }]}
            onPress={() => navigateTo(Screens.Login)}
          >
            <Text style={styles.loginButtonText}>去登录</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // 未登录状态样式
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  loginButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  // 已登录状态样式
  profileContainer: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
