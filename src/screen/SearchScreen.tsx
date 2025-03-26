import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Modal, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../theme/colors';
import LottieView from 'lottie-react-native';
import SearchResultView from './SearchResultView';

interface SearchScreenProps {
  visible: boolean;
  onClose: () => void;
  suggestions: Array<{text: string}>;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ visible, onClose, suggestions }) => {
  const colors = useThemeColors();
  const [isThinking, setIsThinking] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  
  // 处理搜索提交
  const handleSearch = () => {
    if (searchText.trim()) {
      setIsThinking(true);
      setShowResults(false);
      
      // 模拟搜索过程，3秒后显示结果
      setTimeout(() => {
        setIsThinking(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const renderResults = () => {
    if (showResults) {
      return (
        <View style={styles.container}>
          <SearchResultView visible={true}/>
        </View>
      );
    } else {
      return <></>
    }
  }

  const renderSuggestions = () => {
    if (!isThinking && !showResults) {
      return   <View style={styles.recentSearches}>
      <Text style={[styles.recentTitle, {color: colors.text}]}>Recent Searches</Text>
      {suggestions.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.recentItem}
          onPress={() => {
            setSearchText(item.text);
            handleSearch();
          }}
        >
          <Icon name="history" size={18} color={colors.subText} style={styles.recentIcon} />
          <Text style={[styles.recentText, {color: colors.text}]}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
    } else {
     return <></>
    }
  }

  const renderThinking = () => {
    if (isThinking) {
      return (
          <View style={styles.animationContainer}>
            {/* 使用Lottie动画 */}
            <LottieView
              source={require('../assets/thinking-animation.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
            
            <View style={styles.thinkingTextContainer}>
              <Text style={[styles.thinkingText, {color: colors.text}]}>Thinking</Text>
              <LottieView
                source={require('../assets/thinking.json')}
                autoPlay
                loop
                style={styles.thinkingAnimation}
              />
            </View>
            
            <Text style={[styles.thinkingSubtext, {color: colors.subText}]}>
              Analyzing your query and gathering insights from multiple sources
            </Text>
          </View>
      )
    } else {
      return <></>
    }
  }
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <>
            <View style={styles.searchHeader}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <View style={[styles.searchInputActive, {backgroundColor: colors.textBackground}]}>
                <Icon name="search" size={18} color="#9CA3AF" />
                <TextInput
                  style={[styles.searchInputText, {color: colors.text}]}
                  placeholder="Search anything..."
                  placeholderTextColor={colors.subText}
                  autoFocus
                  value={searchText}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
                {searchText ? (
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <Icon name="close" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            </>
            {renderResults()}
            {renderSuggestions()}
            { renderThinking()  }
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputActive: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  searchInputText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    padding: 0,
  },
  searchInputThinking: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchTextDisplay: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    padding: 0,
  },
  recentSearches: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentText: {
    fontSize: 14,
  },
  // 思考中状态的样式
  thinkingContainer: {
    flex: 1,
  },
  navBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logoText: {
    fontFamily: Platform.OS === 'ios' ? 'Pacifico' : 'normal',
    fontSize: 20,
  },
  animationContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  thinkingAnimation: {
    width: 40,
    height: 40,
  },
  thinkingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  thinkingText: {
    fontSize: 20,
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  dotDelay1: {
    transform: [{translateY: -5}],
  },
  dotDelay2: {
    transform: [{translateY: -10}],
  },
  thinkingSubtext: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 280,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 48,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
});

export default SearchScreen;