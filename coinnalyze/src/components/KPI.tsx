import {StyleSheet, View} from 'react-native';
import {
  TICKER_QUERY,
  TICKER_SUBSCRIPTION,
  Theme,
  onBackgroundFaint,
  primary,
  screenPadding,
} from '../globals';
import Text, {BoldText, MediumText} from './Text';
import useTheme from '../hooks/useTheme';
import {useSuspenseQuery} from '@apollo/client';
import {useEffect} from 'react';
import {TickerOfficial} from '../__generated__/graphql';

interface KPIProps {}
export default function KPI({}: KPIProps) {
  const {style, theme} = useTheme(styleDecorator);

  const {data, subscribeToMore} = useSuspenseQuery(TICKER_QUERY, {
    variables: {symbols: ['BTCUSDT']},
  });
  const ticker = data.tickers[0];
  // Subscribe to ticker websocket when the components mounts
  // (This should only run once)
  useEffect(() => {
    subscribeToMore({
      document: TICKER_SUBSCRIPTION,
      variables: {symbols: ['BTCUSDT']},
      updateQuery: (prev, {subscriptionData}) => {
        // Check if data is empty
        if (!subscriptionData.data) return prev;
        const ticker: TickerOfficial = {
          __typename: 'TickerOfficial',
          lastPrice: subscriptionData.data.ticker.curDayClose,
          prevClosePrice: subscriptionData.data.ticker.prevDayClose,
          priceChangePercent: subscriptionData.data.ticker.priceChangePercent,
          symbol: subscriptionData.data.ticker.symbol,
        };
        return {
          ...prev,
          tickers: [
            ticker,
            ...prev.tickers.filter(
              prevTicker => prevTicker.symbol !== ticker.symbol,
            ),
          ],
        };
      },
    });
  }, []);
  return (
    <View style={style.container}>
      <MediumText>BTCUSDT</MediumText>
      <BoldText style={style.price}>
        ${ticker.lastPrice?.toLocaleString('en-US')}
      </BoldText>
      <Text style={style.desc}>
        Last 24 hours{' '}
        <Text
          style={{
            color: ticker.priceChangePercent
              ? ticker.priceChangePercent < 0
                ? 'red'
                : primary(theme)
              : '',
          }}>
          {formatPercent(ticker.priceChangePercent)}
        </Text>
      </Text>
    </View>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {paddingHorizontal: screenPadding.paddingHorizontal},
    price: {fontSize: 32},
    desc: {
      color: onBackgroundFaint(theme),
    },
  });
}
function formatPercent(percent?: number | null) {
  if (percent) return (percent < 0 ? '-' : '+') + percent.toString() + '%';
}
