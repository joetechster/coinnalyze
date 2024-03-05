import useTheme from '../hooks/useTheme';
import {styleDecorator} from './SymbolListItem';
import {MediumText} from './Text';

export default function Symbol({symbol}: {symbol: string}) {
  const {style} = useTheme(styleDecorator);
  return (
    <MediumText style={style.title} numberOfLines={1}>
      {symbol.slice(0, symbol.length - 4)}
      <MediumText style={style.small}> /USDT</MediumText>
    </MediumText>
  );
}
