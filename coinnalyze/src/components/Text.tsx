import {Text, TextProps, StyleSheet, TextStyle} from 'react-native';
import {Theme, onBackground} from '../globals';
import useTheme from '../hooks/useTheme';

interface CustomTextProps extends TextProps {
  style?: TextStyle;
}

export default function CustomText(props: CustomTextProps) {
  const styles = useTheme(styleDecorator);
  const {style, ...propsNoStyle} = props;

  return (
    <Text style={{...styles.text, ...style}} {...propsNoStyle}>
      {props.children}
    </Text>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    text: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      fontWeight: '400',
      color: onBackground(theme),
    },
  });
}
