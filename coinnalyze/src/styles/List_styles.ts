import {StyleSheet} from 'react-native';
import {Theme, screenPadding} from '../globals';

export default function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    addButton: {
      marginLeft: 'auto',
    },
    listWrapper: {
      padding: screenPadding.paddingHorizontal,
    },
  });
}
