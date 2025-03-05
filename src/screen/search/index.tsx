import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../theme/colors';
import NavigationHeader from '../../components/NavigationHeader';
import { useSearchStore } from '../../store/searchStore';
import ResultCard from './components/ResultCard';
import GPTSummaryCard from './components/GPTSummaryCard';
import ThinkingIndicator from './components/ThinkingIndicator';

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
    clearResults,
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
    if (!gptSummary && !thinking) {
      return null;
    }
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
