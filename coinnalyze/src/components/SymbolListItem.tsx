import {StyleSheet, View} from 'react-native';
import Text, {BoldText, MediumText} from './Text';
import AddButton from './AddButton';
import {
  TICKER_QUERY,
  TICKER_SUBSCRIPTION,
  Theme,
  disabled,
  onSurface,
  surface,
} from '../globals';
import useTheme from '../hooks/useTheme';
import {useQuery, useSuspenseQuery} from '@apollo/client';
import {useEffect} from 'react';
import {formatPercent, formatPrice} from './KPI';

interface ListItemProps {
  symbol: string;
  Left?: React.ReactNode;
}

export default function SymbolListItem({symbol, Left}: ListItemProps) {
  const {style, theme} = useTheme(styleDecorator);
  const {data, subscribeToMore} = useSuspenseQuery(TICKER_QUERY, {
    variables: {symbols: [symbol]},
  });
  const {lastPrice, priceChangePercent} = data.tickers[0];
  useEffect(() => {
    subscribeToMore({
      document: TICKER_SUBSCRIPTION,
      variables: {symbols: [symbol]},
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) return prev;
        return {
          __typename: prev.__typename,
          tickers: [
            {
              __typename: 'TickerOfficial',
              lastPrice: subscriptionData.data.ticker.curDayClose,
              prevClosePrice: subscriptionData.data.ticker.prevDayClose,
              priceChangePercent:
                subscriptionData.data.ticker.priceChangePercent,
              symbol: subscriptionData.data.ticker.symbol,
            },
          ],
        };
      },
    });
  }, []);

  return (
    <View style={style.container}>
      {Left}
      <View style={style.middleSection}>
        <MediumText style={style.title} numberOfLines={1}>
          {symbol}
        </MediumText>
        <Text style={style.subTitle}>{'Binance'}</Text>
      </View>

      <View style={style.rightSection}>
        <Text style={style.rightSubText} numberOfLines={1}>
          {formatPercent(theme, priceChangePercent)}
        </Text>
        <Text style={style.rightText} numberOfLines={1}>
          {formatPrice(lastPrice)}
        </Text>
      </View>
    </View>
  );
}

export function SymbolListItemLoading() {
  const {style, theme} = useTheme(styleDecorator);
  const bg = surface(theme);
  return (
    <View style={style.container}>
      <View
        style={{
          height: 48,
          width: 48,
          backgroundColor: bg,
          borderRadius: 8,
        }}></View>
      <View style={[style.middleSection, {gap: 5}]}>
        <View
          style={[style.title, {backgroundColor: bg, borderRadius: 4}]}></View>
        <View
          style={[
            style.subTitle,
            {backgroundColor: bg, borderRadius: 4},
          ]}></View>
      </View>
      <View style={[style.rightSection, {gap: 5}]}>
        <View
          style={{
            width: '50%',
            backgroundColor: bg,
            borderRadius: 4,
            flex: 1,
            alignSelf: 'flex-end',
          }}></View>
        <View
          style={{
            width: '80%',
            backgroundColor: bg,
            borderRadius: 4,
            flex: 1,
            alignSelf: 'flex-end',
          }}></View>
      </View>
    </View>
  );
}
function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-end',
    },
    title: {
      fontSize: 16,
      flex: 1,
    },
    subTitle: {color: disabled(theme), flex: 1},
    rightText: {textAlign: 'right', fontSize: 16},
    rightSubText: {textAlign: 'right'},
    middleSection: {
      flex: 2.5,
    },
    rightSection: {flex: 1, marginLeft: 'auto', alignItems: 'flex-end'},
  });
}
