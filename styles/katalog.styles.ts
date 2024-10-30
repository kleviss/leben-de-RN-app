import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const createStyles = (colorScheme: string | null | undefined) =>
  StyleSheet.create({
    wrapper: {
      borderRadius: 12,
      marginTop: 16,
      overflow: 'hidden',
    },
    card: {
      padding: 16,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      opacity: 0.8,
      marginBottom: 12,
    },
    cardImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginTop: 12,
    },
    cardImagePlaceholder: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginTop: 12,
      backgroundColor: Colors[colorScheme ?? 'light'].border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    listContent: {
      paddingBottom: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    errorText: {
      textAlign: 'center',
      marginBottom: 16,
      fontSize: 16,
    },
  });

export const getModalStyles = (colorScheme: string | null | undefined) =>
  StyleSheet.create({
    modalContent: {
      padding: 16,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    optionText: {
      fontSize: 16,
    },
    separator: {
      height: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].border,
      marginHorizontal: 8,
    },
  });
