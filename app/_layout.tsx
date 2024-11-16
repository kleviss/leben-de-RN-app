import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <PaperProvider>
          <ThemeProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: true, headerTitle: 'Einstellungen', headerBackTitle: 'Zurück' }} />
              <Stack.Screen name="questions/[category]" options={{ headerShown: true }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
