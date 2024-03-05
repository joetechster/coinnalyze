import {
  Theme,
  background,
  onBackgroundFaint,
  primary,
  screenPadding,
  surface,
} from '../globals';
import {ScrollView, StyleSheet, Switch, View} from 'react-native';
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
import {useCallback} from 'react';

export default function Settings({
  navigation,
}: BottomTabScreenProps<TabParamList>) {
  const {style, theme} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();
  const dispatch = useAppDispatch();
  const kpi = useAppSelector(selectKpi);
  if (!mounted) return <Loading />;
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
  return (
    <ScrollView>
      <View style={style.container}>
        <ListItem
          title="KPI"
          Right={<Symbol symbol={kpi} />}
          onPress={KPIPress}
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
      </View>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding, gap: 10},
    item: {padding: 10, backgroundColor: surface(theme), borderRadius: 5},
  });
}
