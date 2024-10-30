import { Button, StyleSheet } from 'react-native';

import React from 'react';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface ErrorViewProps {
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ onRetry }) => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.text}>
      Something went wrong while loading the categories.
    </ThemedText>
    <Button title="Retry" onPress={onRetry} />
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
});