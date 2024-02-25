import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import {Theme, onSurface, surface} from '../globals';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import AddButtonIcon from '../../assets/icons/add-icon.svg';

interface AddButtonProps {
  style?: ViewStyle | ViewStyle[];
  Icon?: React.FC<SvgProps>;
  width?: number;
  height?: number;
  onPress?: (event: GestureResponderEvent) => void;
}
export default function AddButton(props: AddButtonProps) {
  const {style} = useTheme(styleDecorator);
  let {style: foreign_style, ...propsNoStyle} = props;
  foreign_style = combineStyles(foreign_style);
  const size = props.width ? props.width : 30;

  return (
    <Pressable
      style={[style.container, foreign_style, {width: size}]}
      onPress={props.onPress}>
      {props.Icon ? (
        <props.Icon
          fill={style.icon.color}
          width={size / 2}
          height={size / 2}
        />
      ) : (
        <AddButtonIcon
          fill={style.icon.color}
          width={size / 2}
          height={size / 2}
        />
      )}
    </Pressable>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      aspectRatio: 1,
      borderRadius: 8,
      backgroundColor: surface(theme),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: onSurface(theme),
      width: 16,
      height: 16,
    },
  });
}

function combineStyles<T>(styleArr: T) {
  // if style from props is an array the combine them
  if (Array.isArray(styleArr)) {
    return styleArr.reduce((soFar, current) => ({
      ...soFar,
      ...current,
    }));
  } else return styleArr;
}
