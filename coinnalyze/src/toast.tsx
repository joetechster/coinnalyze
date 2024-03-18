// App.jsx
import Toast, {ErrorToast, ToastConfig} from 'react-native-toast-message';
import {
  Theme,
  fontFamilies,
  onBackgroundFaint,
  onSurface,
  surface,
} from './globals';
import useTheme from './hooks/useTheme';
import {StyleSheet} from 'react-native';

export const toastConfig: ToastConfig = {
  error: MyErrorToast,
};

function MyErrorToast(props: any) {
  const {style} = useTheme(styleDecorator);
  return (
    <ErrorToast
      {...props}
      style={style.container}
      text1Style={style.text1}
      text2Style={style.text2}
    />
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {backgroundColor: surface(theme)},
    text1: {
      color: onSurface(theme),
      fontFamily: fontFamilies.bold,
      fontSize: 17,
    },
    text2: {
      color: onBackgroundFaint(theme),
      fontFamily: fontFamilies.regular,
      fontSize: 14,
    },
  });
}

export function showToast(message: string, moreInfo?: string) {
  Toast.show({
    type: 'error',
    text1: message,
    text2: moreInfo,
    visibilityTime: 10000,
    topOffset: 10,
  });
}
