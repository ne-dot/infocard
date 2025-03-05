import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GPTSummary } from '../../../types/search';

interface FavoriteGPTCardProps {
  item: GPTSummary;
  colors: any;
  onRemove: () => void;
}

const FavoriteGPTCard: React.FC<FavoriteGPTCardProps> = ({ item, colors, onRemove }) => {
  return (
    <View style={[styles.card, { backgroundColor: colors.searchBackground }]}>
      <View style={styles.cardContent}>
        <View style={styles.summaryHeader}>
          <View style={styles.headerLeft}>
            <Icon name="lightbulb" size={24} color="#FFC107" />
            <Text style={[styles.summaryTitle, { color: colors.text }]}>
              AI 摘要
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={onRemove}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="favorite" size={20} color="#FF5252" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.summaryContent, { color: colors.text }]}>
          {item.content}
        </Text>
        <Text style={[styles.cardDate, { color: colors.searchPlaceholder, textAlign: 'right' }]}>
          {item.date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  cardDate: {
    fontSize: 12,
  },
  favoriteButton: {
    padding: 4,
  },
});

export default FavoriteGPTCard;