import * as React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import NavigationHeader from '../../components/NavigationHeader';
import { useFavoriteStore, FavoriteItem } from '../../store/favoriteStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FavoriteGoogleCard from './components/FavoriteGoogleCard';
import FavoriteGPTCard from './components/FavoriteGPTCard';
import { GoogleResult, GPTSummary } from '../../types/search';

const FavoriteScreen = () => {
  const colors = useThemeColors();
  const { favorites, removeFavorite } = useFavoriteStore();

  const renderItem = ({ item }: { item: FavoriteItem }) => {
    if (item.type === 'google') {
      return (
        <FavoriteGoogleCard 
          item={item.data as GoogleResult} 
          colors={colors} 
          onRemove={() => removeFavorite(item.id)} 
        />
      );
    } else {
      return (
        <FavoriteGPTCard 
          item={item.data as GPTSummary} 
          colors={colors} 
          onRemove={() => removeFavorite(item.id)} 
        />
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationHeader title="我的收藏" showBackButton={false} />
      
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="favorite-border" size={64} color={colors.searchPlaceholder} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            暂无收藏内容
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites.sort((a, b) => b.timestamp - a.timestamp)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
});

export default FavoriteScreen;