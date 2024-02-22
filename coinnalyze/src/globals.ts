import {ColorValue} from 'react-native';

export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = (typeof themes)[keyof typeof themes];

export const primary = '#38E078';

export const background = (theme: Theme) =>
  theme === themes.dark ? '#141414' : '#FFFFFF';

export const onBackground = (theme: Theme) =>
  theme === themes.dark ? '#FFFFFF' : '#141414';

export const surface = (theme: Theme) =>
  theme === themes.dark ? '#292929' : '#F5F5F5';

export const onSurface = (theme: Theme) =>
  theme === themes.dark ? '#FFFFFF' : '#141414';
