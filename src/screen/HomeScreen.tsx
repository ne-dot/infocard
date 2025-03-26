
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Image, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../theme/colors';
import { useAuthStore } from '../store/authStore';
import SearchScreen from './SearchScreen';

const HomeScreen = () => {
  const { anonymousLogin, isLogin, anonymousId } = useAuthStore();
  const colors = useThemeColors();
  
  // 简化为普通状态管理
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // 处理搜索框点击
  const handleSearchPress = () => {
    setIsSearchOpen(true);
  };

  // 关闭搜索
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  React.useEffect(() => {
    const checkAnonymousUser = async () => {
      // 如果用户未登录且未匿名登录，则尝试匿名登录
      if (!isLogin && !anonymousId) {
        anonymousLogin();
      }
    };
    checkAnonymousUser();
  }, [isLogin, anonymousId, anonymousLogin]);

  const suggestionItems = [
    { text: "How does AI search work?" },
    { text: "Best productivity tools in 2025" },
    { text: "Future of remote work" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 头部 */}
      <View style={styles.header}>
        <View style={[styles.searchContainer, {backgroundColor: colors.textBackground}]}>
          <Icon name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TouchableOpacity 
            style={styles.searchInputContainer} 
            activeOpacity={0.7}
            onPress={handleSearchPress}
          >
            <Text style={[styles.searchPlaceholder, {color: colors.subText}]}>
              Search anything...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.micButton}>
            <Icon name="mic" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 主内容 */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{ uri: 'https://ai-public.mastergo.com/ai/img_res/2da3e6375e465a981859d8bf399f4a27.jpg' }}
            style={styles.welcomeImage}
          />
          <Text style={[styles.welcomeTitle, {color: colors.text}]}>Welcome to MindFlow!</Text>
          <Text style={[styles.welcomeSubtitle, {color: colors.subText}]}>Start searching to discover AI-powered insights</Text>
          <View style={styles.suggestionsContainer}>
            {suggestionItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionCard, {backgroundColor: colors.textBackground}]}
                activeOpacity={0.7}
                onPress={handleSearchPress}
              >
                <Text style={[styles.suggestionText, {color: colors.subText}]}>{item.text}</Text>
                <Icon name="arrow-right" size={16} color="#6366F1" />
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.tipContainer, {backgroundColor: colors.textBackground}]}>
            <Icon name="lightbulb" size={24} color="#6366F1" style={styles.tipIcon} />
            <Text style={[styles.tipText, {color: colors.subText}]}>Try voice search for hands-free exploration</Text>
          </View>
        </View>
      </ScrollView>

      {/* 搜索页面Modal */}
      <SearchScreen 
        visible={isSearchOpen} 
        onClose={closeSearch} 
        suggestions={suggestionItems} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  micButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  welcomeImage: {
    width: 256,
    height: 256,
    borderRadius: 16,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  suggestionsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  suggestionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
  },
  tipContainer: {
    borderRadius: 12,
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
  },
});

export default HomeScreen;
