import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Question {
  _id: string;
  category: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
}

export default function QuestionsScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://leben-de-backend.onrender.com/questions');
      const data = await response.json();
      const filteredQuestions = category === 'Gesamtfragenkatalog'
        ? data
        : data.filter((q: Question) => q.category === category);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = ({ item }: { item: Question }) => (
    <View style={styles.questionCard}>
      <ThemedText style={styles.questionText}>{item.question}</ThemedText>
      {item.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            option === item.answer && styles.correctOption
          ]}
        >
          {/* icon on the right side of the option */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <ThemedText style={styles.optionText}>{option}</ThemedText>
            <Ionicons name={
              option === item.answer ? 'checkmark' : 'close'
            } size={24} color="white" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator animating={true} color={Colors.light.tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: `Fragen für ${decodeURIComponent(category as string)}`,
          headerBackTitle: "Zurück",
        }}
      />
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item) => item._id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark.background,
  },
  questionCard: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    fontWeight: 'bold',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});