import React, {PropsWithChildren, useContext, useMemo, useState} from 'react';
import {Pressable, StatusBar, StyleSheet} from 'react-native';

import ThemeContext from './context/ThemeContext';
import {Theme, background, themes} from './globals';
import useTheme from './hooks/useTheme';
import Text from './components/Text';

function App(): React.JSX.Element {
  const style = useTheme(styleDecorator);
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <>
      <StatusBar
        barStyle={theme === themes.dark ? 'light-content' : 'dark-content'}
        backgroundColor={style.statusBar.backgroundColor}
      />
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, odit
        voluptate aspernatur rem sint saepe dolore omnis voluptatibus ab a
        dolorem asperiores perferendis odio alias aut sequi facere autem eaque!
      </Text>
    </>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    statusBar: {
      backgroundColor: background(theme),
    },
  });
}

export default function AppWrapper(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(themes.light);
  const themeValue = useMemo(() => ({theme, setTheme}), [theme, setTheme]);
  return (
    <ThemeContext.Provider value={themeValue}>
      <App />
    </ThemeContext.Provider>
  );
}
