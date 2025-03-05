import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ThinkingIndicatorProps {
  colors: any;
}

const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ colors }) => {
  return (
    <View style={styles.thinkingContainer}>
      <ActivityIndicator size="small" color={colors.text} />
      <Text style={[styles.thinkingText, { color: colors.text }]}>
        思考中...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
  },
  thinkingText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ThinkingIndicator;
