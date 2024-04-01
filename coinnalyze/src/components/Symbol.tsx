import {TextStyle, ViewStyle} from 'react-native';
import useTheme from '../hooks/useTheme';
import {styleDecorator} from './SymbolListItem';
import {MediumText} from './Text';

interface SymbolProps {
  symbol: string;
  size?: number;
  style?: TextStyle;
}

export default function Symbol({
  symbol,
  style: foreignStyle,
  size = 1,
}: SymbolProps) {
  const {style} = useTheme(styleDecorator);
  return (
    <MediumText
      style={[
        style.title,
        foreignStyle || {},
        {fontSize: style.title.fontSize * size},
      ]}
      numberOfLines={1}>
      {symbol.slice(0, symbol.length - 4)}
      <MediumText
        style={[style.small, {fontSize: style.small.fontSize * size}]}>
        {' '}
        /USDT
      </MediumText>
    </MediumText>
  );
}
