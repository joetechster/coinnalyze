import {useSuspenseQuery} from '@apollo/client';
import useTheme from '../hooks/useTheme';
import {TICKER_QUERY, Theme, surface} from '../globals';
import {StyleSheet, View} from 'react-native';
import Text, {BoldText} from './Text';
import Symbol from './Symbol';
import {ErrorBoundary, ErrorBoundaryProps} from '../errorHandling';
import {Suspense} from 'react';
import Refreshable, {RefreshableProps} from './Refreshable';
import {formatPrice} from '../helpers/helpers';

interface ComparerProps {
  compare: string[];
}
export default function Comparer(
  props: ComparerProps & ErrorBoundaryProps & RefreshableProps,
) {
  return (
    <Refreshable refreshing={props.refreshing} fallback={<ComparerLoading />}>
      <ErrorBoundary fallback={<ComparerLoading />}>
        <Suspense fallback={<ComparerLoading />}>
          <ComparerInner compare={props.compare} />
        </Suspense>
      </ErrorBoundary>
    </Refreshable>
  );
}

function ComparerInner({compare}: ComparerProps) {
  const {style} = useTheme(styleDecorator);
  const {data} = useSuspenseQuery(TICKER_QUERY, {
    variables: {symbols: compare},
  });
  const ticker1 = data.tickers.find(t => t.symbol === compare[0])!;
  const ticker2 = data.tickers.find(t => t.symbol === compare[1])!;

  return (
    <View style={style.comparer}>
      <Text>
        1 <Symbol symbol={ticker1.symbol!} nosuffix /> is
      </Text>
      <BoldText style={style.comparerPrice}>
        {formatPrice(ticker1.lastPrice! / ticker2.lastPrice!, 2)}
        <Symbol
          symbol={ticker2.symbol!}
          size={0.8}
          style={style.bottomSymbol}
          nosuffix
        />
      </BoldText>
    </View>
  );
}

export function ComparerLoading() {
  const {style} = useTheme(styleDecorator);
  return <View style={[style.comparer, style.comparerLoading]}></View>;
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    comparer: {
      flexGrow: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: surface(theme),
    },
    comparerPrice: {
      fontSize: 30,
    },
    comparerLoading: {minHeight: 110},
    bottomSymbol: {marginTop: -5},
  });
}
