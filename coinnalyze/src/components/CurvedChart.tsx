import {StyleSheet, View} from 'react-native';
import {
  CANDLES_QUERY,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  TICKER_SUBSCRIPTION,
  Theme,
  background,
  disabled,
  fontFamilies,
  onBackground,
  screenPadding,
  surface,
} from '../globals';
import useTheme from '../hooks/useTheme';
import {Candle, GetCandlesQuery} from '../__generated__/graphql';
import {area, curveBasis, line, scaleLinear, scaleTime, style} from 'd3';
import {useSuspenseQuery} from '@apollo/client';
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Svg,
  Text,
} from 'react-native-svg';
import {useEffect} from 'react';

interface CurvedChartProps {
  symbol: string;
}

export default function CurvedChart({symbol}: CurvedChartProps) {
  const {style, theme} = useTheme(styleDecorator);
  const width = style.container.width as number;
  const height = style.container.height as number;
  const leftPadding = style.container.paddingHorizontal;
  const paddingBottom = style.container.paddingBottom;

  const {
    data: {candles},
    subscribeToMore,
  } = useSuspenseQuery(CANDLES_QUERY, {
    variables: {symbol},
  });
  const graph = candles && makeGraph(candles, style);

  // subscribe to current prices
  useEffect(() => {
    subscribeToMore({
      document: TICKER_SUBSCRIPTION,
      variables: {symbols: [symbol]},
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) return prev;
        const newCandle = {
          __typename: prev.candles[prev.candles.length - 1].__typename,
          close: subscriptionData.data.ticker.curDayClose,
          closeTime: prev.candles[prev.candles.length - 1].closeTime,
        };
        return {...prev, candles: [...prev.candles.slice(0, -1), newCandle]};
      },
    });
  }, []);

  return (
    <Svg width={width} height={height} stroke={disabled(theme)}>
      <G y={-paddingBottom}>
        <Graph {...graph} candles={candles} />
      </G>
      <G y={height - paddingBottom}>
        {candles.map((candle, i) => {
          const date = new Date(parseFloat(candle.closeTime!));
          const now = i === candles!.length - 1 && 'Now';
          return (
            <Text
              key={i}
              strokeWidth={0}
              fill={onBackground(theme)}
              fontSize="11"
              fontFamily={fontFamilies.regular}
              x={graph?.x(date)}
              y={paddingBottom}
              textAnchor="middle">
              {now ? now : date.toLocaleDateString('en-US', {weekday: 'short'})}
            </Text>
          );
        })}
      </G>
    </Svg>
  );
}

export function CurvedChartLoading() {
  const {style} = useTheme(styleDecorator);
  return <View style={style.loadingContainer}></View>;
}
function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      ...screenPadding,
      height: GRAPH_HEIGHT,
      width: GRAPH_WIDTH,
      paddingBottom: 20,
      paddingTop: 20,
      color: onBackground(theme),
    },
    loadingContainer: {
      height: GRAPH_HEIGHT,
      backgroundColor: surface(theme),
      borderRadius: 10,
      marginHorizontal: screenPadding.paddingHorizontal,
    },
  });
}

export const makeGraph = (
  candles: Candle[],
  style: ReturnType<typeof styleDecorator> | any,
  width?: number,
) => {
  const firstCandle = candles[0];
  const lastCandle = candles[candles.length - 1];
  const max = Math.max(...candles.map(candle => candle.close!));
  const min = Math.min(...candles.map(candle => candle.close!));
  const paddingHorizontal = style.container.paddingHorizontal as number;

  const y = scaleLinear()
    .domain([min, max])
    .range([GRAPH_HEIGHT, style.container.paddingTop + 30]);

  const x = scaleTime()
    .domain([
      new Date(parseFloat(firstCandle.closeTime!)),
      new Date(parseFloat(lastCandle.closeTime!)),
    ])
    .range([paddingHorizontal, (width || GRAPH_WIDTH) - paddingHorizontal]);

  const curvedLine = area<Candle>()
    .x(d => x(new Date(parseFloat(d.closeTime!))))
    .y(d => y(d.close!))
    .curve(curveBasis)(candles);

  const curvedArea = area<Candle>()
    .x(d => x(new Date(parseFloat(d.closeTime!))))
    .y0(d => y(d.close!))
    .y1(y(min))
    .curve(curveBasis)(candles);

  return {
    x,
    y,
    max,
    min,
    area: curvedArea!,
    curve: curvedLine!,
  };
};

interface GraphProps extends ReturnType<typeof makeGraph> {
  candles: Candle[];
  left?: boolean;
  width?: number;
}
export function Graph({
  candles,
  x,
  y,
  curve,
  area,
  width,
  left = false,
}: GraphProps) {
  const {style, theme} = useTheme(styleDecorator);
  width = width || style.container.width;
  const leftPadding = style.container.paddingHorizontal;
  const currentPrice = candles[candles.length - 1].close!;
  const currentPriceScaled = y(currentPrice);
  const currentDateScaled = x(
    new Date(parseFloat(candles[candles.length - 1].closeTime!)),
  );

  return (
    <>
      <Line
        x1={leftPadding}
        y1={currentPriceScaled}
        x2={width - leftPadding}
        y2={currentPriceScaled}
        stroke={disabled(theme)}
        strokeWidth="0.4"
        strokeDasharray={1}
      />
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0" stopColor={disabled(theme)} stopOpacity={0.1} />
          <Stop offset="1" stopColor={background(theme)} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill="url(#grad)" strokeWidth={0} />
      <Path d={curve} strokeWidth="2" stroke={disabled(theme)} />
      <Circle
        cx={currentDateScaled}
        cy={currentPriceScaled}
        r="2"
        strokeWidth="0"
        fill={disabled(theme)}
      />
      <Text
        strokeWidth={0}
        stroke={background(theme)}
        fill={onBackground(theme)}
        fontSize="10"
        fontFamily={fontFamilies.medium}
        x={left ? leftPadding : width - leftPadding}
        y={currentPriceScaled - 5}
        textAnchor={left ? 'start' : 'end'}>
        {currentPrice.toLocaleString('en-US')}
      </Text>
    </>
  );
}
