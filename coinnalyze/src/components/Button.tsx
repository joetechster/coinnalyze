import {Button} from '@rneui/base';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {Theme, fontFamilies, onSurface, primary, surface} from '../globals';
import useTheme from '../hooks/useTheme';

interface ButtonProps {
  onPress?: (e: GestureResponderEvent) => any;
  loading?: boolean;
}
export default function MyButton(props: ButtonProps) {
  const {style, theme} = useTheme(styleDecorator);
  return (
    <Button
      title="Load More"
      onPress={props.onPress}
      buttonStyle={style.button}
      titleStyle={style.buttonTitle}
      containerStyle={style.buttonContainer}
      loading={props.loading}
      loadingProps={{
        size: 'small',
        color: primary(theme),
        animating: true,
      }}
    />
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    button: {
      backgroundColor: surface(theme),
      borderColor: 'transparent',
      borderWidth: 0,
      padding: 10,
    },
    buttonTitle: {
      color: onSurface(theme),
      fontFamily: fontFamilies.bold,
    },
    buttonContainer: {
      borderRadius: 16,
      width: '100%',
    },
  });
}
