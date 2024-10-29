/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    cardBackground: '#fff',
    border: '#E0E0E0',
    shadow: '#000',
    textSecondary: '#687076',
    modalBackground: '#fff',
    modalItemBackground: '#f0f0f0',
  },
  dark: {
    text: '#ECEDEE',
    background: '#1c1f26',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    cardBackground: '#1c1f26',
    border: '#252A34',
    shadow: '#000',
    textSecondary: '#9BA1A6',
    modalBackground: '#1d1e1f',
    modalItemBackground: '#252A34',
  },
};
