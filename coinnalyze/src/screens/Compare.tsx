import {
  Theme,
  onBackground,
  onBackgroundFaint,
  screenPadding,
} from '../globals';
import {ScrollView, StyleSheet, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import RightArrow from '../../assets/icons/right-icon.svg';
import CompareCurvedChart from '../components/CompareCurvedChart';
import {Suspense} from 'react';
import {CurvedChartLoading} from '../components/CurvedChart';
import KPI, {LoadingKPI, formatSymbol} from '../components/KPI';
import {useAppDispatch, useAppSelector} from '../redux_schema/hooks';
import {selectCompare, updateCompare} from '../redux_schema/compareSlice';
import {SymbolListItemLoading} from '../components/SymbolListItem';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {StackParamList, TabParamList} from '../App';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export default function Compare({
  navigation,
}: BottomTabScreenProps<TabParamList, 'Compare'>) {
  const {style, theme} = useTheme(styleDecorator);
  const compare = useAppSelector(selectCompare);
  const dispatch = useAppDispatch();
  const parentNavigation: StackNavigationProp<StackParamList, 'Pick Symbol'> =
    navigation.getParent();

  const itemPress = (index: number) => {
    return () => {
      parentNavigation.navigate<'Pick Symbol'>('Pick Symbol', {
        callback: symbol => {
          dispatch(updateCompare({symbol, index}));
          navigation.navigate('Compare');
        },
      });
    };
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.listItems}>
          {compare.length > 0 ? (
            compare.map((symbol, i) => (
              <ListItem
                key={i}
                title={formatSymbol(symbol, theme)}
                subTitle="Binance"
                Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
                Right={
                  <RightArrow
                    fill={onBackground(theme)}
                    style={{alignSelf: 'center'}}
                  />
                }
                onPress={itemPress(i)}
              />
            ))
          ) : (
            <>
              <SymbolListItemLoading />
              <SymbolListItemLoading />
            </>
          )}
        </View>
        <View style={style.kpiWrapper}>
          {compare.length > 0 ? (
            compare.map((symbol, i) => (
              <Suspense key={i} fallback={<LoadingKPI />}>
                <KPI symbol={symbol} />
              </Suspense>
            ))
          ) : (
            <>
              <LoadingKPI />
              <LoadingKPI />
            </>
          )}
        </View>
        {compare.length > 0 ? (
          <Suspense fallback={<CurvedChartLoading />}>
            <CompareCurvedChart symbols={compare} />
          </Suspense>
        ) : (
          <CurvedChartLoading />
        )}
      </View>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {gap: 15},
    listItems: {gap: 10, paddingHorizontal: screenPadding.paddingHorizontal},
    card: {
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 0.2,
      borderColor: onBackgroundFaint(theme),
    },
    lastDays: {
      color: onBackgroundFaint(theme),
    },
    kpiWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  });
}
