import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../theme/colors';

interface SearchResultScreenProps {
  visible: boolean;
}

const SearchResultView: React.FC<SearchResultScreenProps> = ({ visible }) => {
  const colors = useThemeColors();

  const resultItems = [
    {
      id: '1',
      title: '现代工作空间优化',
      description: '了解如何创建一个高效且符合人体工程学的工作空间，提高生产力和创造力。',
      source: 'Productivity Hub',
      image: 'https://ai-public.mastergo.com/ai/img_res/edf2479beb46c518fd1a1742f89f780f.jpg',
      isFavorite: false,
      isBookmarked: false,
    },
    {
      id: '2',
      title: 'AI驱动的任务管理',
      description: '探索人工智能如何简化您的日常任务并提高工作流程效率。',
      source: 'Tech Insights',
      image: '',
      isFavorite: true,
      isBookmarked: false,
    },
    {
      id: '3',
      title: '数据可视化技术',
      description: '掌握以清晰、吸引人的视觉格式呈现复杂数据的艺术。',
      source: 'Data Science Daily',
      image: 'https://ai-public.mastergo.com/ai/img_res/0511ae7e19426db978ced0b184791e34.jpg',
      isFavorite: false,
      isBookmarked: true,
    },
  ];
  
  if (!visible) return null;
  
  return (
      <View style={[styles.mainContent, {backgroundColor: colors.background}]}>
        {/* 结果列表 */}
        <ScrollView style={styles.resultsContainer}>
          {resultItems.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.resultCard, {backgroundColor: colors.cardBackground}]}
              activeOpacity={0.7}
            >
              {item.image ? (
                <View style={styles.cardImageContainer}>
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.cardImage} 
                  />
                  <TouchableOpacity style={styles.closeButton} onPress={() => {}} >
                    <Icon name="close" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              ) : null}
              
              <Text style={[styles.cardTitle, {color: colors.text}]}>{item.title}</Text>
              <Text style={[styles.cardDescription, {color: colors.subText}]}>{item.description}</Text>
              
              <View style={styles.cardFooter}>
                <Text style={styles.cardSource}>{item.source}</Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon 
                      name={item.isFavorite ? "favorite" : "favorite-border"} 
                      size={18} 
                      color={item.isFavorite ? "#4F46E5" : "#9CA3AF"} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon 
                      name={item.isBookmarked ? "bookmark" : "bookmark-border"} 
                      size={18} 
                      color={item.isBookmarked ? "#4F46E5" : "#9CA3AF"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    
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
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
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
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#4F46E5',
  },
  inactiveTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: 'white',
  },
  inactiveTabText: {
    color: '#6B7280',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSource: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default SearchResultView;
