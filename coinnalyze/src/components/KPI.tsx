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
import {Suspense, useCallback, useEffect} from 'react';
import {TickerOfficial} from '../__generated__/graphql';
import {showErrorToast, showToast} from '../toast';
import Refreshable, {RefreshableProps} from './Refreshable';
import {ErrorBoundary, ErrorBoundaryProps} from '../errorHandling';
import Symbol from './Symbol';
import {formatPercent, formatPrice} from '../helpers/helpers';
import {useFocusEffect} from '@react-navigation/native';

interface KPIProps {
  symbol: string;
}

export default function KPI(
  props: KPIProps & ErrorBoundaryProps & RefreshableProps,
) {
  return (
    <Refreshable refreshing={props.refreshing} fallback={<LoadingKPI />}>
      <ErrorBoundary fallback={<LoadingKPI />}>
        <Suspense fallback={<LoadingKPI />}>
          <KPIInner symbol={props.symbol} />
        </Suspense>
      </ErrorBoundary>
    </Refreshable>
  );
}
function KPIInner({symbol}: KPIProps) {
  const {style, theme} = useTheme(styleDecorator);

  const {data, subscribeToMore} = useSuspenseQuery(TICKER_QUERY, {
    variables: {symbols: [symbol]},
  });
  const ticker = data.tickers[0];

  useFocusEffect(
    useCallback(() => {
      return subscribeToMore({
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
        onError: () =>
          showErrorToast(
            'Connection to server severed',
            'Please check your connection and try again',
          ),
      });
    }, []),
  );
  return (
    <View style={style.container}>
      <Symbol symbol={symbol} />
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
      <View style={[style.loadingSymbol, style.loadingBg]}></View>
      <View style={[style.loadingPrice, style.loadingBg]}></View>
      <View style={[style.loadingPercentage, style.loadingBg]}></View>
    </View>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {paddingHorizontal: screenPadding.paddingHorizontal},
    loadingContainer: {gap: 10, height: 86.3, flex: 1},
    loadingSymbol: {
      width: 90,
      maxWidth: '100%',
      flex: 1,
    },
    loadingPrice: {
      width: 180,
      maxWidth: '100%',
      flex: 2.26,
    },
    loadingPercentage: {
      width: 180,
      maxWidth: '100%',
      flex: 0.98,
    },
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
