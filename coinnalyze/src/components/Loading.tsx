import {Image, StyleSheet, View} from 'react-native';
import {BoldText} from './Text';
import {Theme, background} from '../globals';
import useTheme from '../hooks/useTheme';

export default function Loading() {
  const {style} = useTheme(styleDecorator);

  return (
    <View style={style.container}>
      <BoldText>Loading</BoldText>
    </View>
  );
}
function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background(theme),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
