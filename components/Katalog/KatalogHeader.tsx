import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface KatalogHeaderProps {
  onPickerPress: () => void;
}

export const KatalogHeader: React.FC<KatalogHeaderProps> = ({ onPickerPress }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={[styles.header, { backgroundColor: 'transparent' }]}>
      <ThemedText type="title">Fragenkatalog</ThemedText>
      <TouchableOpacity onPress={onPickerPress} style={styles.pickerButton}>
        <ThemedText numberOfLines={1} style={styles.pickerButtonText}>
          Alle Fragen
        </ThemedText>
        <Ionicons
          name="chevron-down"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  pickerButtonText: {
    marginRight: 4,
  },
});