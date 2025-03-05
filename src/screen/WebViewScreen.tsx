import * as React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationHeader from '../components/NavigationHeader';
import { useThemeColors } from '../theme/colors';
import { useWebViewStore } from '../store/webviewStore';
import { useNavigation } from '@react-navigation/native';

const WebViewScreen: React.FC = () => {
  const colors = useThemeColors();
  const { selectedResult } = useWebViewStore();
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  // 如果没有选中的结果，返回上一页
  React.useEffect(() => {
    if (!selectedResult) {
      navigation.goBack();
    }
  }, [selectedResult, navigation]);

  if (!selectedResult) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <NavigationHeader
          title="加载中..."
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationHeader
        title={selectedResult.title}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      )}
      <WebView
        source={{ uri: selectedResult.content_link }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default WebViewScreen;
