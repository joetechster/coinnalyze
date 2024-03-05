import {StyleSheet, View} from 'react-native';
import Text, {BoldText, LightText, MediumText} from './Text';
import {Theme, disabled, onBackgroundFaint, primary} from '../globals';
import useTheme from '../hooks/useTheme';
import {memo} from 'react';
import AddButton from './AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import {styleDecorator} from './SymbolListItem';

interface ListItemProps {
  symbol: string;
  Left?: React.ReactNode;
  lastPrice?: number;
  priceChangePercent?: number;
}

function SymbolListItemPure({
  symbol,
  lastPrice,
  priceChangePercent,
}: ListItemProps) {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <View style={style.container}>
      <AddButton height={48} width={48} Icon={DollarIcon} />
      <View style={style.middleSection}>
        <MediumText style={style.title} numberOfLines={1}>
          {symbol.slice(0, symbol.length - 4)}
          <MediumText style={style.small}> /USDT</MediumText>
        </MediumText>
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
