import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {
  Theme,
  disabled,
  onSurface,
  primary,
  screenPadding,
  surface,
} from '../globals';
import useTheme from '../hooks/useTheme';
import Text from './Text';

interface CurvedChartProps {
  data: lineDataItem[];
  width?: number;
  spacing?: number;
}
export default function CurvedChart({data, width, spacing}: CurvedChartProps) {
  const {style, theme} = useTheme(styleDecorator);
  return (
    <LineChart
      areaChart
      isAnimated
      curved
      data={data}
      width={width || Dimensions.get('window').width}
      hideYAxisText
      hideDataPoints
      color={disabled(theme)}
      thickness={2}
      startOpacity={0.1}
      endOpacity={0}
      hideRules
      animateOnDataChange
      animationDuration={500}
      onDataChangeAnimationDuration={300}
      rulesColor="gray"
      xAxisThickness={0}
      yAxisThickness={0}
      yAxisLabelWidth={0}
      spacing={(width || Dimensions.get('window').width) / (spacing || 4.5)}
      pointerConfig={{
        pointerStripHeight: 200,
        pointerStripColor: primary(theme),
        pointerStripWidth: 2,
        pointerColor: primary(theme),
        activatePointersOnLongPress: true,
        pointerLabelComponent: (items: any[]) =>
          items.map((item, i) => (
            <Text style={style.pointerLabelText} key={i}>
              {'$' + items[0].value + '.0'}
            </Text>
          )),
      }}
    />
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    pointerLabelText: {
      width: 100,
      borderRadius: 5,
      backgroundColor: surface(theme),
      padding: 6,
      fontWeight: 'bold',
      textAlign: 'center',
      color: onSurface(theme),
    },
  });
}
