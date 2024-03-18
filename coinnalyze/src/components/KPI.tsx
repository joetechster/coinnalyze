import {StyleSheet, View} from 'react-native';
import {
  TICKER_QUERY,
  TICKER_SUBSCRIPTION,
  Theme,
  onBackground,
  onBackgroundFaint,
  primary,
  screenPadding,
  surface,
} from '../globals';
import Text, {BoldText, LightText, MediumText} from './Text';
import useTheme from '../hooks/useTheme';
import {useSuspenseQuery} from '@apollo/client';
import {useEffect} from 'react';
import {TickerOfficial} from '../__generated__/graphql';
import {showToast} from '../toast';

interface KPIProps {
  symbol: string;
}

export default function KPI({symbol}: KPIProps) {
  const {style, theme} = useTheme(styleDecorator);

  const {data, subscribeToMore} = useSuspenseQuery(TICKER_QUERY, {
    variables: {symbols: [symbol]},
  });
  const ticker = data.tickers[0];

  useEffect(() => {
    showToast('Connection to server severed');
    subscribeToMore({
      document: TICKER_SUBSCRIPTION,
      variables: {symbols: [symbol]},
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
      onError: () => showToast('Connection to server severed'),
    });
  }, []);
  return (
    <View style={style.container}>
      <MediumText>{formatSymbol(symbol, theme)}</MediumText>
      <BoldText style={style.price}>{formatPrice(ticker.lastPrice)}</BoldText>
      <Text style={style.desc}>
        Last 24 hours {formatPercent(theme, ticker.priceChangePercent)}
      </Text>
    </View>
  );
}

export function LoadingKPI() {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <View style={[style.container, style.loadingContainer]}>
      <View
        style={{
          width: 90,
          maxWidth: '100%',
          flex: 1,
          ...style.loadingBg,
        }}></View>
      <View
        style={{
          width: 180,
          maxWidth: '100%',
          flex: 2.26,
          ...style.loadingBg,
        }}></View>
      <View
        style={{
          width: 180,
          maxWidth: '100%',
          flex: 0.98,
          ...style.loadingBg,
        }}></View>
    </View>
  );
}
function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {paddingHorizontal: screenPadding.paddingHorizontal},
    loadingContainer: {gap: 10, height: 86.3, flex: 1},
    price: {fontSize: 32},
    desc: {
      color: onBackgroundFaint(theme),
    },
    loadingBg: {
      backgroundColor: surface(theme),
      borderRadius: 5,
    },
  });
}

export function formatPercent(
  theme: Theme,
  percent?: number | null,
  sigfig = 2,
) {
  const color = percent
    ? percent < 0
      ? 'red'
      : primary(theme)
    : onBackground(theme);
  if (percent !== null && percent !== undefined) {
    return (
      <LightText style={{color}}>
        {(percent > 0 ? '+' : '') + percent.toFixed(sigfig) + '%'}
      </LightText>
    );
  }
}

export function formatPrice(price?: number | null, sigfig: number = 0) {
  return '$' + price?.toLocaleString('en-US', {maximumFractionDigits: sigfig});
}

export function formatSymbol(symbol: string, theme: Theme) {
  const splitter = 'USDT';
  const quote = symbol.split(splitter);

  return (
    <>
      {quote}
      {symbol.includes(splitter) && (
        <LightText style={{fontSize: 10, color: onBackgroundFaint(theme)}}>
          {' /' + splitter}
        </LightText>
      )}
    </>
  );
}
