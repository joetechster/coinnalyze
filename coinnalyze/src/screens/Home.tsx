import Text, {BoldText, LightText, MediumText} from '../components/Text';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Theme,
  api_uri,
  onBackground,
  onBackgroundFaint,
  primary,
  screenPadding,
} from '../globals';
import useTheme from '../hooks/useTheme';
import CurvedChart from '../components/CurvedChart';
import CoinsSection from '../components/CoinsSection';
import KPI from '../components/KPI';
import {Suspense} from 'react';
import CompareCurvedChart from '../components/CompareCurvedChart';

export default function Home() {
  const {style, theme} = useTheme(styleDecorator);
  const data = [
    {
      value: 248,
      date: '10 Apr 2022',
      label: '1H',
    },
    {
      value: 240,
      date: '10 Apr 2022',
      label: '1D',
    },
    {
      value: 900,
      date: '20 Apr 2022',
      label: '1W',
    },
    {
      value: 200,
      date: '30 Apr 2022',
      label: '1M',
    },
    {
      value: 400,
      date: '30 Apr 2022',
      label: '1Y',
    },
  ];

  return (
    <ScrollView style={style.scrollView}>
      <View style={style.container}>
        <Suspense fallback={<Text>Loading</Text>}>
          <KPI />
        </Suspense>
        <Suspense fallback={<Text>Loading chart</Text>}>
          <CurvedChart symbol="BTCUSDT" />
        </Suspense>
        <CoinsSection />
      </View>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    container: {
      flex: 1,
      gap: 20,
      color: onBackground(theme),
      paddingVertical: screenPadding.paddingVertical,
    },
  });
}
