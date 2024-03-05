import {FlatList, ListRenderItem, Pressable, StyleSheet} from 'react-native';
import {useAppSelector} from '../redux_schema/hooks';
import {selectSymbols} from '../redux_schema/symbolsSlice';
import {memo, useCallback} from 'react';
import {TickerOfficial} from '../__generated__/graphql';
import Text from '../components/Text';
import {Theme, screenPadding, surface} from '../globals';
import useTheme from '../hooks/useTheme';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../App';

export default function SymbolPicker({
  route,
}: StackScreenProps<StackParamList, 'Pick Symbol'>) {
  const {callback} = route.params;
  const symbols = useAppSelector(selectSymbols);
  const renderItem: ListRenderItem<TickerOfficial> = useCallback(({item}) => {
    return <Item ticker={item} onPress={callback} />;
  }, []);
  const {mounted} = useOnMounted();
  if (!mounted) return <Loading />;

  return (
    <FlatList data={symbols} renderItem={renderItem} initialNumToRender={20} />
  );
}

interface ItemType {
  ticker: TickerOfficial;
  onPress: (symbol: string) => any;
}

const Item = memo(({ticker, onPress}: ItemType) => {
  const {style} = useTheme(styleDecorator);
  return (
    <Pressable style={style.item} onPress={() => onPress(ticker.symbol!)}>
      <Text>{ticker.symbol}</Text>
      <Text>{ticker.lastPrice}</Text>
    </Pressable>
  );
});

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    item: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: surface(theme),
      marginHorizontal: screenPadding.paddingHorizontal,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
}
