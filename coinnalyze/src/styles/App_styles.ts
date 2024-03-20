import {StyleSheet} from 'react-native';
import {Theme, background, surface} from '../globals';

export default function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    header: {
      elevation: 0,
      backgroundColor: background(theme),
    },
    headerTitle: {
      fontSize: 18,
    },
    tabBar: {
      backgroundColor: surface(theme),
      borderTopWidth: 0,
      height: 55,
    },
  });
}
