import {View} from 'react-native';
import Text, {MediumText} from './Text';
import useTheme from '../hooks/useTheme';
import {memo} from 'react';
import AddButton from './AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import {styleDecorator} from './SymbolListItem';
import Symbol from './Symbol';

interface ListItemProps {
  symbol: string;
  lastPrice?: number;
  priceChangePercent?: number;
}

function SymbolListItemPure({
  symbol,
  lastPrice,
  priceChangePercent,
}: ListItemProps) {
  const {style} = useTheme(styleDecorator);

  return (
    <View style={style.container}>
      <AddButton height={48} width={48} Icon={DollarIcon} />
      <View style={style.middleSection}>
        <Symbol symbol={symbol} />
        <Text style={style.subTitle}>{'Binance'}</Text>
      </View>

      <View style={style.rightSection}>
        <Text
          style={[
            style.rightSubText,
            priceChangePercent! < 0 ? style.negative : style.positive,
          ]}
          numberOfLines={1}>
          {priceChangePercent + '%'}
        </Text>
        <Text style={style.rightText} numberOfLines={1}>
          {lastPrice}
        </Text>
      </View>
    </View>
  );
}

export default memo(SymbolListItemPure);
