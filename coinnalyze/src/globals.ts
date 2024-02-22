import {ColorValue} from 'react-native';

export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = (typeof themes)[keyof typeof themes];

export const background = (theme: Theme): ColorValue =>
  theme === themes.dark ? 'green' : 'white';

export const onBackground = (theme: Theme): ColorValue =>
  theme === themes.dark ? 'white' : 'black';

export const surface = (theme: Theme): ColorValue =>
  theme === themes.dark ? 'green' : 'white';

export const onSurface = (theme: Theme): ColorValue =>
  theme === themes.dark ? 'white' : 'black';
