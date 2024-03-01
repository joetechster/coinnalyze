import Text from '../components/Text';
import {Theme, screenPadding} from '../globals';
import {ScrollView, StyleSheet} from 'react-native';
import useTheme from '../hooks/useTheme';
import CoinsSection from '../components/CoinsSection';
import {useOnMounted} from '../hooks/useOnMounted';

export default function Settings() {
  const {style, theme} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();

  if (!mounted) {
    return <Text>Loading</Text>; //OR <LoaderComponent />;
  }
  return (
    <ScrollView style={style.container}>
      <Text>Profile page</Text>
      <CoinsSection />
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding},
  });
}
