import {StyleSheet, View} from 'react-native';
import Text, {MediumText} from './Text';
import {
  TICKER_QUERY,
  TICKER_SUBSCRIPTION,
  Theme,
  disabled,
  onBackgroundFaint,
  primary,
  surface,
} from '../globals';
import useTheme from '../hooks/useTheme';
import {useSuspenseQuery} from '@apollo/client';
import {memo, useEffect} from 'react';

interface ListItemProps {
  symbol: string;
  Left?: React.ReactNode;
  subscribe?: boolean;
}

function SymbolListItem({symbol, Left, subscribe = true}: ListItemProps) {
  const {style, theme} = useTheme(styleDecorator);
  const {data, subscribeToMore} = useSuspenseQuery(TICKER_QUERY, {
    variables: {symbols: [symbol]},
  });

  const {lastPrice, priceChangePercent} = data.tickers[0];
  useEffect(() => {
    if (!subscribe) return;
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

export default memo(SymbolListItem);

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

export function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-end',
      paddingBottom: 10,
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
    small: {fontSize: 12, color: onBackgroundFaint(theme)},
    negative: {color: 'red'},
    positive: {color: primary(theme)},
    rightSection: {flex: 2, marginLeft: 'auto', alignItems: 'flex-end'},
  });
}
