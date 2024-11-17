import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log('systemColorScheme', systemColorScheme);
  console.log('isDarkMode', isDarkMode);

  useEffect(() => {
    loadThemeSettings();
  }, []);

  useEffect(() => {
    if (useSystemTheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, useSystemTheme]);

  const loadThemeSettings = async () => {
    try {
      const useSystem = await AsyncStorage.getItem('useSystemTheme');
      const isDark = await AsyncStorage.getItem('darkMode');

      setUseSystemTheme(useSystem === 'true');
      if (!useSystem) {
        setIsDarkMode(isDark === 'true');
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);