import {Suspense, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Theme, onBackground, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import CurvedChart, {CurvedChartLoading} from '../components/CurvedChart';
import CoinsPreviewSection from '../components/CoinsPreviewSection';
import KPI, {LoadingKPI} from '../components/KPI';
import {useAppSelector} from '../redux_schema/hooks';
import {selectKpi} from '../redux_schema/kpiSlice';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import NewsCarousel, {NewsCarouselLoading} from '../components/NewsCarousel';
import {ErrorBoundary} from '../errorHandling';
import Refreshable from '../components/Refreshable';

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
        <Refreshable refreshing={refreshing} fallback={<LoadingKPI />}>
          <ErrorBoundary fallback={<LoadingKPI />}>
            <Suspense fallback={<LoadingKPI />}>
              <KPI symbol={kpi} />
            </Suspense>
          </ErrorBoundary>
        </Refreshable>
        <Refreshable refreshing={refreshing} fallback={<CurvedChartLoading />}>
          <ErrorBoundary fallback={<CurvedChartLoading />}>
            <Suspense fallback={<CurvedChartLoading />}>
              <CurvedChart symbol={kpi} />
            </Suspense>
          </ErrorBoundary>
        </Refreshable>
        <Refreshable refreshing={refreshing} fallback={<NewsCarouselLoading />}>
          <ErrorBoundary fallback={<NewsCarouselLoading />}>
            <Suspense fallback={<NewsCarouselLoading />}>
              <NewsCarousel />
            </Suspense>
          </ErrorBoundary>
        </Refreshable>
        <ErrorBoundary>{!refreshing && <CoinsPreviewSection />}</ErrorBoundary>
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
