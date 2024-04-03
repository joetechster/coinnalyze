import {Suspense, memo, useCallback} from 'react';
import {selectSymbolsPreview} from '../redux_schema/symbolsSlice';
import AddButton from './AddButton';
import useTheme from '../hooks/useTheme';
import {FlatList, View} from 'react-native';
import {useAppSelector} from '../redux_schema/hooks';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';
import SymbolListItemPure from './SymbolListItemPure';
import {TickerOfficial} from '../__generated__/graphql';
import {selectGainers} from '../redux_schema/gainersSlice';
import styleDecorator from '../styles/List_styles';
import {RootState} from '../redux_schema/store';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from './Loading';

interface SymbolsProps {
  preview?: boolean;
  selector?: (state: RootState) => any;
  large?: boolean;
}

export default function Symbols({
  preview = false,
  selector = selectGainers,
  large = true,
}: SymbolsProps) {
  const {style} = useTheme(styleDecorator);
  const symbols: TickerOfficial[] = useAppSelector(
    preview ? selectSymbolsPreview : selector,
  );
  const renderItem = useCallback(
    ({item}: {item: TickerOfficial}) => <Item ticker={item} large={large} />,
    [],
  );
  const {mounted} = useOnMounted();
  if (!mounted) return <Loading />;
  if (preview)
    return (
      <View style={style.listWrapper}>
        {symbols.map((ticker, i) => (
          <Suspense key={ticker.symbol} fallback={<SymbolListItemLoading />}>
            <SymbolListItem
              symbol={ticker.symbol!}
              Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
            />
          </Suspense>
        ))}
      </View>
    );
  return (
    <FlatList
      data={symbols}
      contentContainerStyle={style.listWrapper}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
    />
  );
}
const getItemLayout = (
  _: ArrayLike<TickerOfficial> | null | undefined,
  index: number,
) => ({
  length: 58,
  offset: 58 * index,
  index,
});
const Item = memo(
  ({ticker, large}: {ticker: TickerOfficial; large: boolean}) => {
    return (
      <Suspense key={ticker.symbol} fallback={<SymbolListItemLoading />}>
        {large ? (
          <SymbolListItemPure
            symbol={ticker.symbol!}
            lastPrice={ticker.lastPrice!}
            closeTime={parseInt(ticker.closeTime!)}
            priceChangePercent={ticker.priceChangePercent!}
          />
        ) : (
          <SymbolListItem symbol={ticker.symbol!} />
        )}
      </Suspense>
    );
  },
);
