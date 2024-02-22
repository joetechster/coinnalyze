import {useContext} from 'react';
import {Theme, themes} from '../globals';
import ThemeContext from '../context/ThemeContext';

export default function useTheme<T>(styleDecorator: (theme: Theme) => T) {
  const {theme} = useContext(ThemeContext);
  return styleDecorator(theme);
}
