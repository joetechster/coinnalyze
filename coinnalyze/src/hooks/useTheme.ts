import {Theme} from '../globals';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux_schema/themeSlice';
import {useMemo} from 'react';

export default function useTheme<T>(styleDecorator: (theme: Theme) => T) {
  const theme = useSelector(selectTheme);
  return useMemo(() => ({style: styleDecorator(theme), theme}), [theme]);
}
