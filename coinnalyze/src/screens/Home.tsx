import {Suspense, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Theme, onBackground, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import CurvedChart, {CurvedChartLoading} from '../components/CurvedChart';
import CoinsSection from '../components/CoinsPreviewSection';
import KPI, {LoadingKPI} from '../components/KPI';
import {useAppSelector} from '../redux_schema/hooks';
import {selectKpi} from '../redux_schema/kpiSlice';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import NewsCarousel, {NewsCarouselLoading} from '../components/NewsCarousel';

export default function Home() {
  const {style} = useTheme(styleDecorator);
  const kpi = useAppSelector(selectKpi);
  const {mounted} = useOnMounted();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 0);
  };
  if (!mounted) return <Loading />;
  return (
    <ScrollView
      style={style.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={style.container}>
        <Suspense fallback={<LoadingKPI />}>
          {kpi && !refreshing ? <KPI symbol={kpi} /> : <LoadingKPI />}
        </Suspense>
        <Suspense fallback={<CurvedChartLoading />}>
          {kpi && !refreshing ? (
            <CurvedChart symbol={kpi} />
          ) : (
            <CurvedChartLoading />
          )}
        </Suspense>
        <Suspense fallback={<NewsCarouselLoading />}>
          {!refreshing ? <NewsCarousel /> : <NewsCarouselLoading />}
        </Suspense>
        {!refreshing && <CoinsSection />}
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
