import {Suspense} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Theme, onBackground, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import CurvedChart, {CurvedChartLoading} from '../components/CurvedChart';
import CoinsSection from '../components/CoinsPreviewSection';
import KPI, {LoadingKPI} from '../components/KPI';
import {useAppSelector} from '../redux_schema/hooks';
import {selectKpi} from '../redux_schema/kpiSlice';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';

export default function Home() {
  const {style} = useTheme(styleDecorator);
  const kpi = useAppSelector(selectKpi);
  const {mounted} = useOnMounted();
  if (!mounted) return <Loading />;
  return (
    <ScrollView style={style.scrollView}>
      <View style={style.container}>
        <Suspense fallback={<LoadingKPI />}>
          {kpi ? <KPI symbol={kpi} /> : <LoadingKPI />}
        </Suspense>
        <Suspense fallback={<CurvedChartLoading />}>
          {kpi ? <CurvedChart symbol={kpi} /> : <CurvedChartLoading />}
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
