import { FlatList, View, ViewStyle, useColorScheme } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Dimensions } from 'react-native';
import { ErrorView } from '@/components/Katalog/ErrorView';
import { LoadingView } from '@/components/Katalog/LoadingView';
import { QuestionCard } from '@/components/QuestionCard';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createStyles } from '@/styles/questions.styles';
import { useQuestions } from '@/hooks/useQuestions';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function QuestionsScreen() {
  const { category } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { questions, isLoading, hasRequestFailed, fetchQuestions } = useQuestions(category as string);

  const dynamicStyles = createStyles(colorScheme);

  console.log('category', category);
  console.log('questions', questions);

  return (
    <ThemedView style={dynamicStyles.container}>
      <Stack.Screen
        options={{
          title: `${decodeURIComponent(category as string).toLocaleUpperCase().replace(/_/g, ' ')}`,
          headerBackTitle: "Zurück",
        }}
      />

      {isLoading ? (
        <LoadingView />
      ) : hasRequestFailed ? (
        <ErrorView onRetry={fetchQuestions} text="Something went wrong while loading the questions." />
      ) : questions.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ThemedText>Keine Fragen gefunden</ThemedText>
        </View>
      ) : (
        <FlatList
          data={questions}
          renderItem={({ item }) => (
            <QuestionCard
              item={item}
              colorScheme={colorScheme}
            // style={dynamicStyles.questionCard as ViewStyle}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        // contentContainerStyle={dynamicStyles.listContent as ViewStyle}
        />
      )}
    </ThemedView>
  );
}

// Update styles
export const getModalStyles = (colorScheme: string | null | undefined) =>
  StyleSheet.create({
    card: {
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: '#2a2b3e',
      width: SCREEN_WIDTH * 0.925,
      padding: 20,
      borderRadius: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignSelf: 'center',
    },
    listContent: {
      paddingVertical: 8,
    },
  });
