import Text from '../components/Text';
import {
  Theme,
  background,
  onBackgroundFaint,
  primary,
  screenPadding,
  surface,
} from '../globals';
import {ScrollView, StyleSheet, Switch, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import CoinsSection from '../components/CoinsPreviewSection';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import {useAppDispatch} from '../redux_schema/hooks';
import {toggleTheme} from '../redux_schema/themeSlice';

export default function Settings() {
  const {style, theme} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();
  const dispatch = useAppDispatch();
  if (!mounted) return <Loading />;
  const updateTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <ScrollView>
      <View style={style.container}>
        <ListItem
          title="Dark Theme"
          Right={
            <Switch
              value={theme === 'dark'}
              onValueChange={updateTheme}
              trackColor={{false: background(theme)}}
              thumbColor={
                theme === 'dark' ? primary(theme) : onBackgroundFaint(theme)
              }
            />
          }
          onPress={updateTheme}
          style={style.item}
        />
      </View>
    </ScrollView>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding, gap: 10},
    item: {padding: 10, backgroundColor: surface(theme), borderRadius: 5},
  });
}
