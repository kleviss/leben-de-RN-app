import { StyleSheet, Switch, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <ThemedText type="title"
          style={{
            fontSize: 16,
            color: 'black'
          }}>Dark Mode</ThemedText>

        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          disabled={true}
          trackColor={{ false: '#756d6d', true: '#756d6d' }}
        />
      </View>
      <Text style={{ fontSize: 16, color: '#756d6d', marginTop: 16, marginLeft: 16 }}>
        {/* {isDarkMode ? 'Eingeschaltet' : 'Ausgeschaltet'} */}
        Diese Funktion ist noch nicht verfügbar.
      </Text>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#b8b0b043',
    borderRadius: 50,
  },
});