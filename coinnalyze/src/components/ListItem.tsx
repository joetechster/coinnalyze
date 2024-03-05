import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Text, {MediumText} from './Text';
import {Theme, onBackgroundFaint, onSurface, surface} from '../globals';
import useTheme from '../hooks/useTheme';

interface ListItemProps {
  title?: string | React.ReactNode;
  subTitle?: string;
  Left?: React.ReactNode;
  Right?: React.ReactNode;
  Middle?: React.ReactNode;
  rightText?: string;
  rightSubText?: string;
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle;
}

export default function ListItem({
  Left,
  Right,
  Middle,
  title,
  subTitle,
  rightText,
  rightSubText,
  onPress,
  style: foreignStyle,
}: ListItemProps) {
  const {style} = useTheme(styleDecorator);
  return (
    <Pressable style={[style.container, foreignStyle]} onPress={onPress}>
      {Left}
      <View style={style.middleSection}>
        {title && (
          <MediumText style={style.title} numberOfLines={1}>
            {title}
          </MediumText>
        )}
        {Middle}
        {subTitle && <Text style={style.subTitle}>{subTitle}</Text>}
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
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      flex: 1,
    },
    subTitle: {color: onBackgroundFaint(theme), flex: 1},
    rightText: {textAlign: 'right', fontSize: 16},
    rightSubText: {textAlign: 'right'},
    middleSection: {
      flex: 5,
    },
    rightSection: {marginLeft: 'auto', flex: 1},
  });
}
