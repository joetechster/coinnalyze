// @ts-nocheck
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
import Favourites from '../components/Favourites';
import Featured from '../components/Featured';

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
        <View style={{paddingHorizontal: screenPadding.paddingHorizontal}}>
          <MediumText>Bitcoin</MediumText>
          <BoldText style={{fontSize: 32}}>$30,300</BoldText>
          <Text style={style.lastDays}>
            Last 30 days <Text style={{color: primary(theme)}}>+15%</Text>
          </Text>
        </View>
        <CurvedChart data={data} />
        <Favourites />
        <Featured />
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
    lastDays: {
      color: onBackgroundFaint(theme),
    },
  });
}
