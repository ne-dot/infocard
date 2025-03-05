import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSearchStore } from '../../../store/searchStore';
import { useFavoriteStore } from '../../../store/favoriteStore';

interface GPTSummaryCardProps {
  colors: any;
}

const GPTSummaryCard: React.FC<GPTSummaryCardProps> = ({ colors }) => {
  const { gptSummary } = useSearchStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  
  if (!gptSummary) {
    return null;
  }
  
  const favorited = isFavorite(gptSummary.id);
  
  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(gptSummary.id);
    } else {
      addFavorite(gptSummary, 'gpt');
    }
  };
  
  return (
    <View style={[styles.summaryCard, { backgroundColor: colors.searchBackground }]}>
      <View style={styles.summaryHeader}>
        <View style={styles.headerLeft}>
          <Icon name="lightbulb" size={24} color="#FFC107" />
          <Text style={[styles.summaryTitle, { color: colors.text }]}>
            AI 摘要
          </Text>
        </View>
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
      <Text style={[styles.summaryContent, { color: colors.text }]}>
        {gptSummary.content}
      </Text>
      <Text style={[styles.summaryDate, { color: colors.searchPlaceholder }]}>
        {gptSummary.date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  favoriteButton: {
    padding: 4,
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
});

export default GPTSummaryCard;