import { Button, StyleSheet } from 'react-native';

import React from 'react';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface ErrorViewProps {
  onRetry: () => void;
  text?: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ onRetry, text }) => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.text}>
      {text || 'Something went wrong while loading the categories.'}
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
    borderRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
});