import {Theme} from '../globals';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux_schema/themeSlice';

export default function useTheme<T>(styleDecorator: (theme: Theme) => T) {
  const theme = useSelector(selectTheme);
  return {style: styleDecorator(theme), theme};
}
