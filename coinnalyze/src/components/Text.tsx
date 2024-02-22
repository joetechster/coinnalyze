import {Text, TextProps, StyleSheet} from 'react-native';
import {Theme, onBackground} from '../globals';
import useTheme from '../hooks/useTheme';

interface CustomTextProps extends TextProps {}

export default function CustomText(props: CustomTextProps) {
  const styles = useTheme(styleDecorator);

  return (
    <Text {...props} style={styles.text}>
      {props.children}
    </Text>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    text: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      fontWeight: '400',
      color: onBackground(theme),
    },
  });
}
