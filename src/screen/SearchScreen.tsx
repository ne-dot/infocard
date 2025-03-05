import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, FlatList, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../theme/colors';
import NavigationHeader from '../components/NavigationHeader';
import { useSearchStore } from '../store/searchStore';
import { GoogleResult } from '../types/search';

// 结果卡片组件
const ResultCard = ({ item, colors }: { item: GoogleResult, colors: any }) => {
  const handleOpenLink = () => {
    if (item.link) {
      Linking.openURL(item.link);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.searchBackground }]}
      onPress={handleOpenLink}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.cardSnippet, { color: colors.searchPlaceholder }]} numberOfLines={3}>
          {item.snippet}
        </Text>
        <Text style={[styles.cardLink, { color: '#4285F4' }]} numberOfLines={1}>
          {item.link}
        </Text>
        <Text style={[styles.cardDate, { color: colors.searchPlaceholder }]}>
          {item.date}
        </Text>
      </View>
      {item.thumbnail_link && (
        <Image 
          source={{ uri: item.thumbnail_link }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

// GPT摘要卡片组件
const GPTSummaryCard = ({ colors }: { colors: any }) => {
  const { gptSummary } = useSearchStore();
  if (!gptSummary) return null;
  return (
    <View style={[styles.summaryCard, { backgroundColor: colors.searchBackground }]}>
      <View style={styles.summaryHeader}>
        <Icon name="lightbulb" size={24} color="#FFC107" />
        <Text style={[styles.summaryTitle, { color: colors.text }]}>
          AI 摘要
        </Text>
      </View>
      <Text style={[styles.summaryContent, { color: colors.text }]}>
        {gptSummary.content}
      </Text>
      <Text style={[styles.summaryDate, { color: colors.searchPlaceholder }]}>
        {gptSummary.date}
      </Text>
    </View>
  );
};

// 思考状态组件
const ThinkingIndicator = ({ colors }: { colors: any }) => {
  return (
    <View style={styles.thinkingContainer}>
      <ActivityIndicator size="small" color={colors.text} />
      <Text style={[styles.thinkingText, { color: colors.text }]}>
        思考中...
      </Text>
    </View>
  );
};

const SearchScreen = () => {
  const colors = useThemeColors();
  // 使用搜索状态
  const { 
    query, 
    gptSummary,
    googleResults, 
    loading, 
    thinking,
    error, 
    setQuery, 
    search, 
    clearResults 
  } = useSearchStore();

  // 处理搜索输入变化
  const handleSearchChange = (text: string) => {
    setQuery(text);
  };

  // 处理搜索提交
  const handleSearch = () => {
    search();
  };

  // 清除搜索
  const handleClear = () => {
    setQuery('');
    clearResults();
  };

  // 渲染列表头部
  const renderListHeader = () => {
    if (!gptSummary && !thinking) return null;
    
    return (
      <View style={styles.listHeader}>
        {thinking ? (
          <ThinkingIndicator colors={colors} />
        ) : (
          <GPTSummaryCard colors={colors} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationHeader title="搜索" />
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.searchBackground }]}>
          <Icon name="search" size={24} color={colors.iconColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.searchText }]}
            placeholder="搜索内容"
            value={query}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearch}
            placeholderTextColor={colors.searchPlaceholder}
            autoFocus={true}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Icon name="clear" size={24} color={colors.iconColor} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.searchButton, { backgroundColor: colors.text }]} 
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={{ color: colors.background }}>搜索</Text>
        </TouchableOpacity>
      </View>

      {/* 加载指示器 */}
      {loading && !thinking && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      )}

      {/* 错误信息 */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
        </View>
      )}

      {/* 搜索结果列表 */}
      <FlatList
        data={googleResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResultCard item={item} colors={colors} />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={
          !loading && query.length > 0 && googleResults.length === 0 && !error && !thinking ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: colors.text }}>没有找到相关结果</Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  listContent: {
    padding: 16,
  },
  listHeader: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardSnippet: {
    fontSize: 14,
    marginBottom: 8,
  },
  cardLink: {
    fontSize: 12,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  summaryContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  summaryDate: {
    fontSize: 12,
    textAlign: 'right',
  },
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
  },
  thinkingText: {
    marginLeft: 10,
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default SearchScreen;