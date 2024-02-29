import {StatusBar, StyleSheet} from 'react-native';
import {Theme, background, themes} from '../globals';
import useTheme from '../hooks/useTheme';

export default function ThemedStatusBar() {
  const {style, theme} = useTheme(styleDecorator);
  style.statusBar.backgroundColor = 'green';
  return (
    <StatusBar
      barStyle={theme === themes.dark ? 'light-content' : 'dark-content'}
      backgroundColor={style.statusBar.backgroundColor}
    />
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    statusBar: {
      backgroundColor: background(theme),
    },
  });
}
