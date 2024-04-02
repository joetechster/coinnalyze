import {TextStyle, ViewStyle} from 'react-native';
import useTheme from '../hooks/useTheme';
import {styleDecorator} from './SymbolListItem';
import {MediumText} from './Text';

interface SymbolProps {
  symbol: string;
  size?: number;
  style?: TextStyle;
  nosuffix?: boolean;
}

export default function Symbol({
  symbol,
  style: foreignStyle,
  size = 1,
  nosuffix,
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
      {!nosuffix && (
        <MediumText
          style={[style.small, {fontSize: style.small.fontSize * size}]}>
          {' '}
          /USDT
        </MediumText>
      )}
    </MediumText>
  );
}
