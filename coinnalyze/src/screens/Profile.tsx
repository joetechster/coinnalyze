import Text from '../components/Text';
import {Theme, screenPadding} from '../globals';
import {ScrollView, StyleSheet} from 'react-native';
import useTheme from '../hooks/useTheme';

export default function Profile() {
  const {style, theme} = useTheme(styleDecorator);
  return (
    <ScrollView style={style.container}>
      <Text>Profile page</Text>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding},
  });
}
