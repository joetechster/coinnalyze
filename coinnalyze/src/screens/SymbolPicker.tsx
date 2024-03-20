import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useAppSelector} from '../redux_schema/hooks';
import {selectSymbols} from '../redux_schema/symbolsSlice';
import {memo, useCallback, useMemo, useState, useTransition} from 'react';
import {TickerOfficial} from '../__generated__/graphql';
import Text from '../components/Text';
import {
  Theme,
  fontFamilies,
  onSurface,
  screenPadding,
  surface,
} from '../globals';
import useTheme from '../hooks/useTheme';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../App';
import Symbol from '../components/Symbol';
import SearchIcon from '../../assets/icons/search-icon.svg';
import {SearchSource} from 'jest';

export default function SymbolPicker({
  route,
}: StackScreenProps<StackParamList, 'Pick Symbol'>) {
  const {callback} = route.params;
  const {style, theme} = useTheme(styleDecorator);
  const tickers = useAppSelector(selectSymbols);
  const [search, onChangeSearch] = useState('');
  const filteredTickers = useMemo(
    () =>
      tickers.filter(t =>
        t.symbol
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase().trim()),
      ),
    [search],
  );

  const renderItem: ListRenderItem<TickerOfficial> = useCallback(({item}) => {
    return <Item ticker={item} onPress={callback} />;
  }, []);

  const {mounted} = useOnMounted();
  if (!mounted) return <Loading />;

  return (
    <FlatList
      ListHeaderComponent={
        <View style={style.inputContainer}>
          <SearchIcon fill={onSurface(theme)} />
          <TextInput
            style={style.input}
            onChangeText={onChangeSearch}
            value={search}
            placeholder="Search"
          />
        </View>
      }
      contentContainerStyle={style.container}
      data={filteredTickers}
      renderItem={renderItem}
      initialNumToRender={20}
    />
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
      <Symbol symbol={ticker.symbol!} />
      <Text>{ticker.lastPrice}</Text>
    </Pressable>
  );
});

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      marginHorizontal: screenPadding.paddingHorizontal,
      gap: 10,
    },
    item: {
      padding: 10,
      backgroundColor: surface(theme),
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      color: onSurface(theme),
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontFamily: fontFamilies.regular,
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: surface(theme),
      alignItems: 'center',
      paddingLeft: 10,
      borderRadius: 5,
    },
  });
}
