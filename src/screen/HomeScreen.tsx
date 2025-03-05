
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../theme/colors';
import NavigationHeader from '../components/NavigationHeader';
import { useTypedNavigation, Screens } from './navigation';

const HomeScreen = () => {
  const colors = useThemeColors();
  const { navigateTo } = useTypedNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationHeader title="Home" showBackButton={false} />
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Hey ne zz, how can I help?</Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={[styles.searchInputContainer, { backgroundColor: colors.searchBackground }]}
          onPress={() => navigateTo(Screens.Search)}
        >
          <Icon name="search" size={24} color={colors.iconColor} style={styles.searchIcon} />
          <Text style={[styles.searchPlaceholder, { color: colors.searchPlaceholder }]}>
            Message Copilot
          </Text>
          <TouchableOpacity style={styles.micButton}>
            <Icon name="mic" size={24} color={colors.iconColor} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      {/* 这里可以添加搜索结果或其他内容 */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '600',
    marginTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
  },
  micButton: {
    padding: 5,
  },
});

export default HomeScreen;
