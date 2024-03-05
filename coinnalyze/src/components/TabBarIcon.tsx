import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Theme, onBackgroundFaint, primary} from '../globals';
import useTheme from '../hooks/useTheme';
import {StyleSheet, View} from 'react-native';
import Text, {MediumText, ThinText} from './Text';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  Icon: React.FC<SvgProps>;
  title: string;
}
export default function TabBarIcon({Icon, focused, title}: TabBarIconProps) {
  const {style, theme} = useTheme(styleDecorator);
  return (
    <View style={style.container}>
      <Icon
        fill={focused ? primary(theme) : onBackgroundFaint(theme)}
        height={20}
        width={20}
      />
      <MediumText
        numberOfLines={1}
        style={[
          style.label,
          {color: focused ? primary(theme) : onBackgroundFaint(theme)},
        ]}>
        {title}
      </MediumText>
    </View>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {alignItems: 'center', gap: 5},
    label: {textAlign: 'center', fontSize: 10, width: '100%'},
  });
}
