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
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import RightArrow from '../../assets/icons/right-icon.svg';
import CurvedChart from '../components/CurvedChart';
import CompareCurvedChart from '../components/CompareCurvedChart';

export default function Compare() {
  const {style, theme} = useTheme(styleDecorator);

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
        <View style={style.card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              paddingVertical: 20,
              gap: 10,
              flexWrap: 'wrap',
            }}>
            <View>
              <MediumText>Bitcoin</MediumText>
              <BoldText style={{fontSize: 32}}>$30,300</BoldText>
              <Text style={style.lastDays}>
                Last 30 days <Text style={{color: primary(theme)}}>+15%</Text>
              </Text>
            </View>
            <View>
              <MediumText>Bitcoin</MediumText>
              <BoldText style={{fontSize: 32}}>$30,300</BoldText>
              <Text style={style.lastDays}>
                Last 30 days <Text style={{color: primary(theme)}}>+15%</Text>
              </Text>
            </View>
          </View>
          <CompareCurvedChart
            symbols={['BTCUSDT', 'ETHUSDT']}
            width={GRAPH_WIDTH - screenPadding.paddingHorizontal * 2}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding, gap: 10},
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
  });
}
