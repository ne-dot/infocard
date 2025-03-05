import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GoogleResult } from '../../../types/search';
import { useFavoriteStore } from '../../../store/favoriteStore';

interface ResultCardProps {
  item: GoogleResult;
  colors: any;
}

const ResultCard: React.FC<ResultCardProps> = ({ item, colors }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const favorited = isFavorite(item.id);

  const handleOpenLink = () => {
    if (item.link) {
      Linking.openURL(item.link);
    }
  };

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(item.id);
    } else {
      addFavorite(item, 'google');
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
        <View style={styles.cardFooter}>
          <Text style={[styles.cardDate, { color: colors.searchPlaceholder }]}>
            {item.date}
          </Text>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={handleToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon 
              name={favorited ? "favorite" : "favorite-border"} 
              size={20} 
              color={favorited ? "#FF5252" : colors.searchPlaceholder} 
            />
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default ResultCard;