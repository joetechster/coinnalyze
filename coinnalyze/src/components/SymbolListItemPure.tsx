import {View} from 'react-native';
import Text, {MediumText} from './Text';
import useTheme from '../hooks/useTheme';
import {memo, useCallback, useEffect, useState} from 'react';
import AddButton from './AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import {styleDecorator} from './SymbolListItem';
import Symbol from './Symbol';
import {formatPrice} from '../helpers/helpers';
import moment from 'moment';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

interface ListItemProps {
  symbol: string;
  lastPrice?: number;
  closeTime?: number;
  priceChangePercent?: number;
}

function SymbolListItemPure({
  symbol,
  lastPrice,
  closeTime,
  priceChangePercent,
}: ListItemProps) {
  const {style} = useTheme(styleDecorator);

  return (
    <View style={style.container}>
      <AddButton height={48} width={48} Icon={DollarIcon} />
      <View style={style.middleSection}>
        <Symbol symbol={symbol} />
        <Text style={style.subTitle}>
          {closeTime && <Moment closeTime={closeTime} />}
        </Text>
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
          {formatPrice(lastPrice, 10)}
        </Text>
      </View>
    </View>
  );
}

function Moment({closeTime}: {closeTime: number}) {
  const calcFromNow = useCallback(
    () =>
      moment().diff(moment(closeTime!)) < 10000
        ? 'Now'
        : moment(closeTime!).fromNow(),
    [],
  );
  const [m, setM] = useState(calcFromNow());

  useFocusEffect(
    useCallback(() => {
      setM(calcFromNow());
    }, [calcFromNow()]),
  );
  return <>{m}</>;
}

export default memo(SymbolListItemPure);
