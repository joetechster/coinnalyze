import * as React from 'react';
import {Theme, themes} from '../globals';

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
export default React.createContext<ThemeContextType>({
  theme: themes.light,
  setTheme: () => null,
});
