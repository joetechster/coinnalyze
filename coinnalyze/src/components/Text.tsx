import {
  Text as NativeText,
  TextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {FontFamiily, Theme, fontFamilies, onBackground} from '../globals';
import useTheme from '../hooks/useTheme';

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  fontFamily?: FontFamiily;
}

export default function Text(props: CustomTextProps) {
  const {style: styles} = useTheme(styleDecorator);

  let {style, ...propsNoStyle} = props;
  const fontFamily = props.fontFamily || styles.text.fontFamily;

  if (Array.isArray(style))
    style = style.reduce((soFar, current) => ({...soFar, ...current}));

  return (
    <NativeText
      style={{...styles.text, ...{fontFamily}, ...style}}
      {...propsNoStyle}>
      {props.children}
    </NativeText>
  );
}

export const MediumText = (props: CustomTextProps) => {
  const fontFamily: FontFamiily = props.fontFamily || 'Inter-Medium';
  const newProps = {...props, fontFamily};
  return <Text {...newProps}></Text>;
};
export const ThinText = (props: CustomTextProps) => {
  const fontFamily: FontFamiily = props.fontFamily || 'Inter-Thin';
  const newProps = {...props, fontFamily};
  return <Text {...newProps}></Text>;
};
export const LightText = (props: CustomTextProps) => {
  const fontFamily: FontFamiily = props.fontFamily || 'Inter-Light';
  const newProps = {...props, fontFamily};
  return <Text {...newProps}></Text>;
};
export const BoldText = (props: CustomTextProps) => {
  const fontFamily: FontFamiily = props.fontFamily || 'Inter-Bold';
  const newProps = {...props, fontFamily};
  return <Text {...newProps}></Text>;
};
export const ExtraBoldText = (props: CustomTextProps) => {
  const fontFamily: FontFamiily = props.fontFamily || 'Inter-ExtraBold';
  const newProps = {...props, fontFamily};
  return <Text {...newProps}></Text>;
};

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    text: {
      fontFamily: fontFamilies.regular,
      fontSize: 14,
      fontWeight: '400',
      color: onBackground(theme),
    },
  });
}
