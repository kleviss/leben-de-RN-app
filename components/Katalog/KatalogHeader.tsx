import { StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/context/ThemeContext';

interface KatalogHeaderProps {
  onPickerPress: () => void;
}

export const KatalogHeader: React.FC<KatalogHeaderProps> = ({ onPickerPress }) => {
  const { isDarkMode } = useTheme();
  const colorScheme = isDarkMode ? 'dark' : 'light';

  return (

    <>
      {/* <StatusBar /> */}
      <View style={styles.header}>
        <ThemedText type="title"
        // lightColor="#000000" darkColor="#ffffff"
        >
          Fragenkatalog
        </ThemedText>
        <TouchableOpacity onPress={onPickerPress} style={styles.pickerButton}>
          <ThemedText
            numberOfLines={1}
            style={styles.pickerButtonText}
            lightColor="#000000"
            darkColor="#ffffff"
          >
            Alle Fragen
          </ThemedText>
          <Ionicons
            name="chevron-down"
            size={24}
            color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
      </View>
    </>
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