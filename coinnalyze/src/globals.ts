import {ViewStyle} from 'react-native';

export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export const fontFamilies = {
  medium: 'Inter-Medium',
  thin: 'Inter-Thin',
  extraBold: 'Inter-ExtraBold',
  bold: 'Inter-Bold',
  light: 'Inter-Light',
  regular: 'Inter-Regular',
} as const;
export type FontFamiily = (typeof fontFamilies)[keyof typeof fontFamilies];

export type Theme = (typeof themes)[keyof typeof themes];

export const primary = (theme: Theme) =>
  theme === themes.dark ? '#38E078' : '#17994A';

export const screenPadding: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 20,
};

export const background = (theme: Theme) =>
  theme === themes.dark ? '#141414' : '#FFFFFF';

export const onBackgroundFaint = (theme: Theme) =>
  theme === themes.dark ? '#C4C4C4' : '#737373';

export const onBackground = (theme: Theme) =>
  theme === themes.dark ? '#FFFFFF' : '#141414';

export const surface = (theme: Theme) =>
  theme === themes.dark ? '#292929' : '#F5F5F5';

export const onSurface = (theme: Theme) =>
  theme === themes.dark ? '#FFFFFF' : '#141414';

export const disabled = (theme: Theme) =>
  theme === themes.dark ? '#C4C4C4' : '#737373';
