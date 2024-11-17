import { StyleSheet, Switch, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/context/ThemeContext';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={[styles.container, {
        backgroundColor: isDarkMode ? '#222334d0' : '#fff'
      }]}>
        <View style={styles.settingItem}>
          <ThemedText type="title"
            style={{
              fontSize: 16,
              color: isDarkMode ? '#fff' : '#000'
            }}>Dark Mode</ThemedText>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            // disabled={true}
            trackColor={{ false: isDarkMode ? '#fff' : '#4b982f8e', true: isDarkMode ? '#95ff6f8e' : '#4b982f8e' }}
          />

        </View>
        <View style={styles.settingItem}>
          <ThemedText type="title"
            style={{
              fontSize: 16,
              color: isDarkMode ? '#fff' : '#000'
            }}>Use System Theme</ThemedText>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            // disabled={true}
            trackColor={{ false: isDarkMode ? '#fff' : '#4b982f8e', true: isDarkMode ? '#95ff6f8e' : '#4b982f8e' }}
          />

        </View>
        <View style={styles.divider} />

        <Text style={{ fontSize: 14, color: '#756d6d', marginTop: 16, marginLeft: 16 }}>

          Theme ändern oder System Theme verwenden

        </Text>
      </View >
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 16,
    // padding: 16,
    borderWidth: 1,
    borderColor: '#b8b0b043',
    borderRadius: 20,
    paddingBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,

  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#b8b0b043',
    // marginHorizontal: 16,
  },
});
