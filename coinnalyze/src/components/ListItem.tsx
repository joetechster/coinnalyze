import {
  GestureResponderEvent,
  GestureResponderHandlers,
  Pressable,
  PressableAndroidRippleConfig,
  RippleBackgroundPropType,
  StyleSheet,
  View,
} from 'react-native';
import Text, {BoldText, MediumText} from './Text';
import AddButton from './AddButton';
import {Theme, disabled, onSurface, surface} from '../globals';
import useTheme from '../hooks/useTheme';
import {useMemo} from 'react';

interface ListItemProps {
  title: string | React.ReactNode;
  subTitle?: string;
  Left?: React.ReactNode;
  Right?: React.ReactNode;
  rightText?: string;
  rightSubText?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export default function ListItem({
  Left,
  Right,
  title,
  subTitle,
  rightText,
  rightSubText,
  onPress,
}: ListItemProps) {
  const {style, theme} = useTheme(styleDecorator);
  return (
    <Pressable style={style.container} onPress={onPress}>
      {Left}
      <View style={style.middleSection}>
        <MediumText style={style.title} numberOfLines={1}>
          {title}
        </MediumText>
        <Text style={style.subTitle}>{subTitle}</Text>
      </View>
      {Right}

      {rightText && (
        <View style={style.rightSection}>
          {rightSubText && (
            <Text style={style.rightSubText} numberOfLines={1}>
              {rightSubText}
            </Text>
          )}
          <Text style={style.rightText} numberOfLines={1}>
            {rightText}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-end',
    },
    title: {
      fontSize: 16,
      flex: 1,
    },
    subTitle: {color: disabled(theme), flex: 1},
    rightText: {textAlign: 'right', fontSize: 16},
    rightSubText: {textAlign: 'right'},
    middleSection: {
      flex: 5,
    },
    rightSection: {marginLeft: 'auto', flex: 1},
  });
}
