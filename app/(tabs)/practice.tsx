import { Animated, Button, Dimensions, PanResponder, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Colors } from '@/constants/Colors';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LoadingView } from '@/components/Katalog/LoadingView';
import { PracticeCategoryBottomSheet } from '@/components/PracticeCategoryBottomSheet';
import { Question } from '@/types/questions.types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCategories } from '@/hooks/useCategories';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuestions } from '@/hooks/useQuestions';

// Add BottomSheetModalProvider

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export default function PracticeScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState('Gesamtfragenkatalog');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestMode, setIsTestMode] = useState(false);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const position = useRef(new Animated.ValueXY()).current;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['55%', '75%'], []);

  const { categories, isLoading: categoriesLoading } = useCategories();
  const { questions, isLoading: questionsLoading, fetchQuestions } = useQuestions(selectedCategory);

  // Create practice blocks of 30 questions
  const practiceBlocks = useMemo(() => {
    if (!questions.length) return {};

    const blocks: { [key: string]: Question[] } = {
      'Einbürgerungstest': questions.slice(0, 33),
    };

    if (selectedCategory !== 'Gesamtfragenkatalog') {
      const numBlocks = Math.ceil(questions.length / 30);
      for (let i = 0; i < numBlocks; i++) {
        const start = i * 30;
        const end = start + 30;
        blocks[`Übungsblock ${i + 1} (${start + 1}-${Math.min(end, questions.length)})`] =
          questions.slice(start, end);
      }
    } else {
      blocks['Alle Fragen'] = questions;
    }

    return blocks;
  }, [questions, selectedCategory]);

  const [selectedBlock, setSelectedBlock] = useState('Alle Fragen');
  const currentQuestions = useMemo(() =>
    practiceBlocks[selectedBlock] || [],
    [practiceBlocks, selectedBlock]
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    }
  });

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    const currentQuestion = currentQuestions[currentIndex];
    if (selectedAnswer !== null &&
      currentQuestion.options[selectedAnswer] === currentQuestion.answer) {
      setCorrectAnswers(prev => prev + 1);
    }
    setCurrentIndex(currentIndex + 1);
    position.setValue({ x: 0, y: 0 });
    setIsShowingAnswer(false);
    setSelectedAnswer(null);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setSelectedBlock(category === 'Gesamtfragenkatalog' ? 'Alle Fragen' : 'Übungsblock 1 (1-30)');
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleTestModeToggle = useCallback(() => {
    setIsTestMode(prev => !prev);
    setSelectedBlock('Einbürgerungstest');
    setCurrentIndex(0);
    setCorrectAnswers(0);
  }, []);

  const renderCard = () => {
    if (!currentQuestions.length) return null;

    if (currentIndex >= currentQuestions.length) {
      return (
        <View style={styles.card}>
          <ThemedText style={styles.completedText}>
            Übung abgeschlossen! 🎉
          </ThemedText>
          <ThemedText style={styles.scoreText}>
            Punkte: {correctAnswers} / {currentQuestions.length}
          </ThemedText>
          <View style={styles.completedButtons}>
            <Button
              onPress={() => {
                setCurrentIndex(0);
                setCorrectAnswers(0);
              }}
              title="Wiederholen"
            />
            <Button
              onPress={() => {
                console.log('Modal ref:', bottomSheetModalRef.current);
                bottomSheetModalRef.current?.present();
              }} title="Andere Kategorie"
            />
          </View>
        </View>
      );
    }

    const question = currentQuestions[currentIndex];
    const correctAnswerIndex = question.options.findIndex(
      option => option === question.answer
    );

    return (
      <ThemedView style={styles.content}>
        <Animated.View
          style={[styles.card, getCardStyle()]}
          {...panResponder.panHandlers}
        >
          <ThemedText style={styles.questionText}>
            {question.question}
          </ThemedText>

          {/* if questions has images loop through them */}
          {question.images && (
            <View style={styles.imageOptionsContainer}>
              {question.images.map((imageUrl, index) => (
                <View key={index} style={styles.imageOption}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <ThemedText style={styles.imageOptionText}>
                    {`Bild ${index + 1}`}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  isShowingAnswer && index === correctAnswerIndex && styles.correctOption,
                  isShowingAnswer &&
                  selectedAnswer === index &&
                  selectedAnswer !== correctAnswerIndex &&
                  styles.wrongOption,
                ]}
                onPress={() => setSelectedAnswer(index)}
                disabled={isShowingAnswer}
              >
                <ThemedText style={[
                  styles.optionText,
                  isShowingAnswer && index === correctAnswerIndex && styles.correctOptionText,
                  isShowingAnswer &&
                  selectedAnswer === index &&
                  selectedAnswer !== correctAnswerIndex &&
                  styles.wrongOptionText,
                ]}>
                  {option}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ThemedView>
    );
  };

  const renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity
        style={styles.categoryPicker}
        onPress={() => {
          console.log('Modal ref:', bottomSheetModalRef.current);
          bottomSheetModalRef.current?.present();
        }}>
        <ThemedText style={styles.categoryText}>
          {selectedCategory}
        </ThemedText>
        <Ionicons
          name="caret-down-outline"
          size={24}
          color={Colors[colorScheme ?? 'light'].text}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.testModeButton,
          isTestMode && styles.testModeButtonActive
        ]}
        onPress={handleTestModeToggle}
      >
        <Ionicons
          name="school"
          size={24}
          color={Colors[colorScheme ?? 'light'].text}
        />
      </TouchableOpacity>
    </View>
  );

  if (questionsLoading || categoriesLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingView />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderTopBar()}
      <ThemedView style={styles.container}>

        <View style={styles.cardContainer}>
          {renderCard()}
        </View>

        {currentIndex !== currentQuestions.length && (
          <View style={styles.bottomControls}>
            <Button
              onPress={() => {
                if (isShowingAnswer) {
                  forceSwipe('right');
                } else {
                  setIsShowingAnswer(true);
                }
              }}
              title={isShowingAnswer ? 'Nächste Frage' : 'Antwort anzeigen'}
            />
          </View>
        )}
      </ThemedView>
      <PracticeCategoryBottomSheet
        categories={categories}
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleCategoryChange={handleCategoryChange}
        colorScheme={colorScheme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 20,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  content: {
    flex: 1,
    padding: 16,
    margin: 16,
    borderRadius: 25,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.925,
    height: SCREEN_WIDTH * 1.30,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1a1b2e',
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  selectedOption: {
    borderColor: '#4a4b5e',
    backgroundColor: '#2a2b3e',
  },
  correctOption: {
    backgroundColor: '#1a472e',
    borderColor: '#2a573e',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  correctOptionText: {
    color: '#7fff9b',
  },
  bottomControls: {
    width: '100%',
    padding: 16,
    paddingBottom: 72,
  },
  completedText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  completedButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  bottomSheetBackground: {
    borderRadius: 25,
  },
  bottomSheetContent: {
    padding: 16,
  },
  categoryOption: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  categoryOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  testModeButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#2a2b3e',
  },
  testModeButtonActive: {
    backgroundColor: '#1a472e',
    borderColor: '#2a573e',
  },
  wrongOption: {
    backgroundColor: '#472e2e',
    borderColor: '#573e3e',
  },
  wrongOptionText: {
    color: '#ff9b9b',
  },
  imageOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageOption: {
    width: '23%',
    aspectRatio: 1,
    marginBottom: 10,
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
});
