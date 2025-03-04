
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../theme/colors';
import NavigationHeader from '../components/NavigationHeader'

const HomeScreen = () => {
  const [searchText, setSearchText] = React.useState('');
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationHeader title="Home" showBackButton={false} />
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Hey ne zz, how can I help?</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.searchBackground }]}>
          <Icon name="search" size={24} color={colors.iconColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.searchText }]}
            placeholder="Message Copilot"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.searchPlaceholder}
          />
          <TouchableOpacity style={styles.micButton}>
            <Icon name="mic" size={24} color={colors.iconColor} />
          </TouchableOpacity>
        </View>
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  micButton: {
    padding: 5,
  },
});

export default HomeScreen;
