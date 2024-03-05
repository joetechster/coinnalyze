import {
  Theme,
  background,
  onBackgroundFaint,
  primary,
  screenPadding,
  surface,
} from '../globals';
import {ListRenderItem, StyleSheet, Switch, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import {useAppDispatch, useAppSelector} from '../redux_schema/hooks';
import {toggleTheme} from '../redux_schema/themeSlice';
import {selectKpi, updateKpi} from '../redux_schema/kpiSlice';
import Symbol from '../components/Symbol';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {StackParamList, TabParamList} from '../App';
import {memo, useCallback} from 'react';
import {BoldText} from '../components/Text';
import AddButton from '../components/AddButton';
import {
  selectFavourites,
  selectFavouritesUpdateState,
  updateFavouritesWithString,
} from '../redux_schema/favouritesSlice';
import {FlatList} from 'react-native-gesture-handler';
import {TickerOfficial} from '../__generated__/graphql';
import {StackNavigationProp} from '@react-navigation/stack';

export default function Settings({
  navigation,
}: BottomTabScreenProps<TabParamList>) {
  const {style, theme} = useTheme(styleDecorator);
  const kpi = useAppSelector(selectKpi);
  const favoutritesUpdateState = useAppSelector(selectFavouritesUpdateState);
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();
  const {mounted} = useOnMounted();

  const updateTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, []);

  const KPIPress = useCallback(() => {
    const stackNavigation: BottomTabNavigationProp<StackParamList> =
      navigation.getParent();
    stackNavigation.navigate('Pick Symbol', {
      callback(symbol) {
        navigation.navigate('Settings');
        dispatch(updateKpi(symbol));
      },
    });
  }, []);

  const renderFavourites: ListRenderItem<TickerOfficial> = useCallback(
    ({item}) => <Item symbol={item.symbol!} />,
    [],
  );

  const addFavourite = useCallback(() => {
    const stackNavigation: StackNavigationProp<StackParamList> =
      navigation.getParent();
    stackNavigation.navigate('Pick Symbol', {
      callback(symbol) {
        dispatch(updateFavouritesWithString(symbol));
        navigation.navigate('Settings');
      },
    });
  }, []);

  if (!mounted || favoutritesUpdateState === 'pending') return <Loading />;

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ListItem
            title="KPI"
            Right={<Symbol symbol={kpi} style={{flex: 2}} />}
            onPress={KPIPress}
            style={style.item}
          />
          <ListItem
            title="Dark Theme"
            Right={
              <Switch
                value={theme === 'dark'}
                onValueChange={updateTheme}
                trackColor={{false: background(theme)}}
                thumbColor={
                  theme === 'dark' ? primary(theme) : onBackgroundFaint(theme)
                }
              />
            }
            onPress={updateTheme}
            style={style.item}
          />
          <View style={style.favouritesHeader}>
            <BoldText style={style.favouritesTitle}>Favourites</BoldText>
            <AddButton onPress={addFavourite} />
          </View>
        </>
      }
      data={favourites}
      renderItem={renderFavourites}
      contentContainerStyle={style.container}
    />
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding},
    item: {
      padding: 10,
      backgroundColor: surface(theme),
      borderRadius: 5,
      marginBottom: 10,
    },
    favouritesTitle: {fontSize: 20},
    favouritesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
  });
}

interface ItemProps {
  symbol: string;
}
const Item = memo(({symbol}: ItemProps) => {
  const {style} = useTheme(styleDecorator);
  return <ListItem Middle={<Symbol symbol={symbol} />} style={style.item} />;
});
