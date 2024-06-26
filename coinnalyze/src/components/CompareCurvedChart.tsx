import {RefreshControlProps, StyleSheet} from 'react-native';
import {
  CANDLES_QUERY,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  TICKER_SUBSCRIPTION,
  Theme,
  fontFamilies,
  onBackground,
  onBackgroundFaint,
  screenPadding,
} from '../globals';
import useTheme from '../hooks/useTheme';
import {useSuspenseQuery} from '@apollo/client';
import {G, Svg, Text} from 'react-native-svg';
import {Suspense, useCallback, useEffect} from 'react';
import {CurvedChartLoading, makeGraph, styleDecorator} from './CurvedChart';
import {Graph} from './CurvedChart';
import {showErrorToast, showToast} from '../toast';
import {useFocusEffect} from '@react-navigation/native';
import Refreshable from './Refreshable';
import {ErrorBoundary, ErrorBoundaryProps} from '../errorHandling';

interface CurvedChartProps {
  symbols: string[];
  width?: number;
}
export default function CompareCurvedChart(
  props: CurvedChartProps & ErrorBoundaryProps & RefreshControlProps,
) {
  return (
    <Refreshable
      refreshing={props.refreshing}
      fallback={<CurvedChartLoading />}>
      <ErrorBoundary fallback={<CurvedChartLoading />}>
        <Suspense fallback={<CurvedChartLoading />}>
          <CompareCurvedChartInner symbols={props.symbols} />
        </Suspense>
      </ErrorBoundary>
    </Refreshable>
  );
}

function CompareCurvedChartInner({symbols, width}: CurvedChartProps) {
  const {style, theme} = useTheme(styleDecorator);
  width = width || style.container.width;
  const height = style.container.height;
  const paddingBottom = style.container.paddingBottom;

  const {
    data: {candles: firstSymbolCandles},
    subscribeToMore: firstSymbolSubscribe,
  } = useSuspenseQuery(CANDLES_QUERY, {
    variables: {symbol: symbols[0]},
  });
  const {
    data: {candles: secondSymbolCandles},
    subscribeToMore: secondSymbolSubscribe,
  } = useSuspenseQuery(CANDLES_QUERY, {
    variables: {symbol: symbols[1]},
  });
  const firstGraph = makeGraph(firstSymbolCandles, style, width);
  const secondGraph = makeGraph(secondSymbolCandles, style, width);

  // subscribe to current prices
  useFocusEffect(
    useCallback(() => {
      return firstSymbolSubscribe({
        document: TICKER_SUBSCRIPTION,
        variables: {symbols: [symbols[0]]},
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) return prev;
          const newCandle = {
            __typename: prev.candles[prev.candles.length - 1].__typename,
            close: subscriptionData.data.ticker.curDayClose,
            closeTime: prev.candles[prev.candles.length - 1].closeTime,
          };
          return {...prev, candles: [...prev.candles.slice(0, -1), newCandle]};
        },
        onError: () =>
          showErrorToast(
            'Connection to server severed',
            'Please check your connection and try again',
          ),
      });
    }, [symbols[0]]),
  );
  useFocusEffect(
    useCallback(() => {
      return secondSymbolSubscribe({
        document: TICKER_SUBSCRIPTION,
        variables: {symbols: [symbols[1]]},
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) return prev;
          const newCandle = {
            __typename: prev.candles[prev.candles.length - 1].__typename,
            close: subscriptionData.data.ticker.curDayClose,
            closeTime: prev.candles[prev.candles.length - 1].closeTime,
          };
          return {...prev, candles: [...prev.candles.slice(0, -1), newCandle]};
        },
        onError: () =>
          showErrorToast(
            'Connection to server severed',
            'Please check your connection and try again',
          ),
      });
    }, [symbols[1]]),
  );
  return (
    <Svg width={width} height={height} stroke={onBackgroundFaint(theme)}>
      <G y={-paddingBottom}>
        <Graph
          {...firstGraph}
          left={true}
          symbol={symbols[0]}
          candles={firstGraph.formatedCandles}
          width={width}
        />
        <Graph
          {...secondGraph}
          candles={secondGraph.formatedCandles}
          symbol={symbols[1]}
          width={width}
        />
      </G>
      <G y={height - paddingBottom}>
        {firstGraph.formatedCandles.map((candle, i) => {
          const date = new Date(parseFloat(candle.closeTime!));
          const now = i === firstSymbolCandles.length - 1 && 'Now';
          return (
            <Text
              key={i}
              strokeWidth={0}
              fill={onBackground(theme)}
              fontSize="11"
              fontFamily={fontFamilies.regular}
              x={firstGraph.x(date)}
              y={paddingBottom - 5}
              textAnchor="middle">
              {now ? now : date.toLocaleDateString('en-US', {weekday: 'short'})}
            </Text>
          );
        })}
      </G>
    </Svg>
  );
}
