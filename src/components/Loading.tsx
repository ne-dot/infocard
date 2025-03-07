import React, { createContext, useContext, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { useThemeColors } from '../theme/colors';

// 创建 Loading Context
interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  showLoading: () => {},
  hideLoading: () => {},
  isLoading: false,
});

// Loading Provider 组件
export const LoadingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('加载中...');
  const colors = useThemeColors();

  const showLoading = (msg?: string) => {
    setMessage(msg || '加载中...');
    setVisible(true);
  };

  const hideLoading = () => {
    setVisible(false);
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading: visible }}>
      {children}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={hideLoading}
      >
        <View style={styles.container}>
          <View style={[styles.loadingBox, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primay} />
            <Text style={[styles.loadingText, { color: colors.text }]}>{message}</Text>
          </View>
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
};

// 自定义 Hook，用于在组件中使用 Loading
export const useLoading = () => useContext(LoadingContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingBox: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },
});