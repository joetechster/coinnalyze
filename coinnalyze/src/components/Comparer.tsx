import {useSuspenseQuery} from '@apollo/client';
import useTheme from '../hooks/useTheme';
import {TICKER_QUERY, Theme, surface} from '../globals';
import {StyleSheet, View} from 'react-native';
import Text, {BoldText} from './Text';
import Symbol from './Symbol';
import {ErrorBoundary, ErrorBoundaryProps} from '../errorHandling';
import {Suspense} from 'react';

interface ComparerProps {
  compare: string[];
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
        1{' '}
        <BoldText>
          <Symbol symbol={ticker1.symbol!} />
        </BoldText>{' '}
        is
      </Text>
      <BoldText style={style.comparerPrice}>
        {(ticker1.lastPrice! / ticker2.lastPrice!).toFixed(4).toLocaleString()}
      </BoldText>
      <Symbol symbol={ticker2.symbol!} size={0.8} style={style.bottomSymbol} />
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
      flex: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: surface(theme),
    },
    comparerPrice: {
      fontSize: 30,
      paddingTop: 10,
    },
    comparerLoading: {minHeight: 110},
    bottomSymbol: {marginTop: -5},
  });
}

export default function Comparer(props: ComparerProps & ErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={<ComparerLoading />}>
      <Suspense fallback={<ComparerLoading />}>
        <ComparerInner compare={props.compare} />
      </Suspense>
    </ErrorBoundary>
  );
}
