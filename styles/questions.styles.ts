import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const createStyles = (colorScheme: string | null | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    questionCard: {
      borderRadius: 20,
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
      backgroundColor: '#1a1b2e',
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
    },
    correctOption: {
      backgroundColor: '#68cb6c40',
    },
    optionText: {
      color: 'white',
      fontSize: 16,
      maxWidth: '90%',
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
