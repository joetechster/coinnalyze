import Text from '../components/Text';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Theme, onBackground, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import CurvedChart, {CurvedChartLoading} from '../components/CurvedChart';
import CoinsSection from '../components/CoinsSection';
import KPI, {LoadingKPI} from '../components/KPI';
import {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {useOnMounted} from '../hooks/useOnMounted';

export default function Home() {
  const {style} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();

  // Do some setup here (initial setup for local storage)
  if (!mounted /* and is we have gotten the initial state */) {
    return <Text>Loading</Text>; //OR <LoaderComponent />;
  }

  return (
    <ScrollView style={style.scrollView}>
      <View style={style.container}>
        <Suspense fallback={<LoadingKPI />}>
          <KPI symbol="BTCUSDT" />
        </Suspense>
        <Suspense fallback={<CurvedChartLoading />}>
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
