import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import { ThemedView } from '../ThemedView';

export const LoadingView: React.FC = () => {

  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].primary} />
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});