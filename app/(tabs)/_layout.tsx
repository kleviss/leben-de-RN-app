import { StyleSheet, View } from 'react-native';

import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const { isDarkMode } = useTheme();
  const colorScheme = isDarkMode ? 'dark' : 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 23,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          bottom: 0,
          elevation: 5,
          shadowColor: '#585555',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          borderTopWidth: 0, // Removes the default border
        },
        tabBarBackground: () => (
          <BlurView
            intensity={20}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 25,
              overflow: 'hidden',
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ),
        tabBarItemStyle: {
          padding: 5,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
          // paddingBottom: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Startseite',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="house"
              size={22}
              color={focused ? color : 'gray'}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="katalog"
        options={{
          title: 'Katalog',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="swatchbook"
              size={22}
              color={focused ? color : 'gray'}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Übung',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="brain"
              size={22}
              color={focused ? color : 'gray'}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});