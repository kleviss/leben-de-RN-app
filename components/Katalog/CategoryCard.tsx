import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';

import { CategoryCardProps } from '@/types/katalog.types';
import { Colors } from '@/constants/Colors';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { createStyles } from '@/styles/katalog.styles';

export const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  onPress,
  colorScheme,
  isLoading
}) => {
  const styles = createStyles(colorScheme);
  const baseColor = Colors[colorScheme ?? 'light'].background;
  const backgroundColor = baseColor === '#ffffff' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <TouchableOpacity onPress={() => onPress(item._id)}>
      <View style={[styles.wrapper, { backgroundColor }]}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardSubtitle}>{item.numQuestions} Fragen</ThemedText>
          </View>

          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
            />
          ) : (
            <View style={styles.cardImagePlaceholder}>
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  color={Colors[colorScheme ?? 'light'].tint}
                />
              )}
              <ThemedText>Kein Bild verfügbar</ThemedText>
            </View>
          )}
        </View>
      </View>
      <Divider style={{ marginBottom: 24, marginTop: 12, marginHorizontal: 16 }} />
    </TouchableOpacity>
  );
};