import Text, {BoldText, MediumText} from '../components/Text';
import {
  GRAPH_WIDTH,
  Theme,
  disabled,
  onBackground,
  onBackgroundFaint,
  primary,
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
import KPI from '../components/KPI';

export default function Compare() {
  const {style, theme} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();

  if (!mounted) {
    return <Text>Loading</Text>; //OR <LoaderComponent />;
  }
  return (
    <ScrollView>
      <View style={style.container}>
        {[...new Array(2)].map((_, i) => (
          <ListItem
            key={i}
            title={i.toString()}
            Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
            Right={
              <RightArrow
                fill={onBackground(theme)}
                style={{alignSelf: 'center'}}
              />
            }
          />
        ))}
        <View style={style.kpiWrapper}>
          <KPI symbol="BTCUSDT" />
          <KPI symbol="ETHUSDT" />
        </View>
        <Suspense fallback={<CurvedChartLoading />}>
          <CompareCurvedChart symbols={['BTCUSDT', 'ETHUSDT']} />
        </Suspense>
      </View>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {gap: 10},
    card: {
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 0.2,
      borderColor: disabled(theme),
      paddingBottom: 30,
    },
    lastDays: {
      color: onBackgroundFaint(theme),
    },
    kpiWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      flexWrap: 'wrap',
    },
  });
}
