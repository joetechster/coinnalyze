import {TextStyle, ViewStyle} from 'react-native';
import useTheme from '../hooks/useTheme';
import {styleDecorator} from './SymbolListItem';
import {MediumText} from './Text';

interface SymbolProps {
  symbol: string;
  style?: TextStyle;
}
export default function Symbol({symbol, style: foreignStyle}: SymbolProps) {
  const {style} = useTheme(styleDecorator);
  return (
    <MediumText style={[style.title, foreignStyle || {}]} numberOfLines={1}>
      {symbol.slice(0, symbol.length - 4)}
      <MediumText style={style.small}> /USDT</MediumText>
    </MediumText>
  );
}
