import { Image, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { QuestionCardProps } from '@/types/questions.types';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { createStyles } from '@/styles/questions.styles';

export const QuestionCard: React.FC<QuestionCardProps> = ({ item, colorScheme }) => {
  const styles = createStyles(colorScheme);
  const baseColor = Colors[colorScheme ?? 'light'].background;
  const backgroundColor = baseColor === '#ffffff' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <View style={[styles.questionCard, { backgroundColor }]}>
      <ThemedText style={styles.questionText}>{item.question}</ThemedText>
      {item.images && (
        <View style={componentStyles.imageOptionsContainer}>
          {/* id only one image show it as a full width image */}
          {item.images.length === 1 ? (
            <View style={componentStyles.fullImageContainer}>
              <Image
                source={{ uri: item.images[0] }}
                style={componentStyles.fullImage}
                resizeMode="cover"
              />
            </View>
          ) : (
            item.images.map((imageUrl, index) => (
              <View key={index} style={componentStyles.imageOption}>
                <Image
                  source={{ uri: imageUrl }}
                  style={componentStyles.image}
                  resizeMode="cover"
                />
                <ThemedText style={componentStyles.imageOptionText}>
                  {`Bild ${index + 1}`}
                </ThemedText>
              </View>
            ))
          )}
        </View>
      )}
      <View style={componentStyles.optionsContainer}>
        {item.options.map((option, index) => (
          <View
            key={index}
            style={[
              styles.optionButton,
              item.answer === option && styles.correctOption,
            ]}
          >
            <ThemedText style={styles.optionText}>
              {option}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageOption: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  imageOptionText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 4,
    marginTop: 10,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1a1b2e',
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  correctOption: {
    backgroundColor: '#1a472e',
    borderColor: '#2a573e',
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  fullImageContainer: {
    width: '100%',
    aspectRatio: 1,

  },
});
