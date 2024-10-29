import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemedView } from '@/components/ThemedView';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          borderRadius: 45, // Rounded corners
          marginBottom: 55, // Bottom margin
          backgroundColor: Colors[colorScheme ?? 'light'].background, // Ensuring background color is set
          height: 60,
          width: '70%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          paddingBottom: 10,
        },
        tabBarBackground: (() => (
          // <BlurView
          //   intensity={80}
          //   style={{
          //     ...StyleSheet.absoluteFillObject,
          //     borderTopLeftRadius: 20,
          //     borderTopRightRadius: 20,
          //     overflow: "hidden",
          //     backgroundColor: "transparent",
          //   }}
          // />
          <View style={{
            ...StyleSheet.absoluteFillObject,
            borderBottomEndRadius: 40,
            borderBottomStartRadius: 40,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            overflow: "hidden",
            backgroundColor: "transparent",
          }}>

          </View>
        ))
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="house" size={24} color={focused ? color : 'gray'} />
          ),
        }}

      />
      <Tabs.Screen
        name="katalog"
        options={{
          title: 'Katalog',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="swatchbook" size={24} color={focused ? color : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="brain" size={24} color={focused ? color : 'gray'} />
          ),
        }}
      />
    </Tabs>
  );
}
