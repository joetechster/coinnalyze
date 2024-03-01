import Text from '../components/Text';
import {
  Theme,
  disabled,
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
import {useOnMounted} from '../hooks/useOnMounted';
import {Suspense} from 'react';
import {CurvedChartLoading} from '../components/CurvedChart';
import KPI, {LoadingKPI, formatSymbol} from '../components/KPI';
import {useAppSelector} from '../redux_schema/hooks';
import {selectCompare} from '../redux_schema/compareSlice';
import {SymbolListItemLoading} from '../components/SymbolListItem';

export default function Compare() {
  const {style, theme} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();
  const compare = useAppSelector(selectCompare);

  if (!mounted) {
    return <Text>Loading</Text>; //OR <LoaderComponent />;
  }
  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.listItems}>
          {compare.length > 0
            ? compare.map((symbol, i) => (
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
                />
              ))
            : [1, 2].map((_, i) => <SymbolListItemLoading key={i} />)}
        </View>
        <View style={style.kpiWrapper}>
          {compare.length > 0
            ? compare.map((symbol, i) => (
                <Suspense key={i} fallback={<LoadingKPI />}>
                  <KPI symbol={symbol} />
                </Suspense>
              ))
            : [1, 2].map((_, i) => <LoadingKPI key={i} />)}
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
      borderColor: disabled(theme),
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
