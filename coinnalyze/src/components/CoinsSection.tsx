import {StyleSheet, View} from 'react-native';
import {Theme, primary, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import {useState} from 'react';
import {Pressable} from 'react-native';
import Text, {BoldText} from './Text';
import Favourites from './Favourites';
import Featured from './Featured';

export default function CoinsSection() {
  const {style} = useTheme(styleDecorator);
  const [index, setIndex] = useState(0);

  return (
    <>
      <View style={style.header}>
        <Option
          title="Hot"
          onPress={() => setIndex(0)}
          selected={index === 0}
        />
        <Option
          title="Favourites"
          onPress={() => setIndex(1)}
          selected={index === 1}
        />
      </View>
      <Favourites show={index === 1} />
      <Featured show={index === 0} />
    </>
  );
}

interface OptionProps {
  title: string;
  onPress: () => any;
  selected: boolean;
}
function Option({title, onPress, selected}: OptionProps) {
  const {style} = useTheme(styleDecorator);

  return (
    <Pressable onPress={onPress} style={[selected && style.optionSelected]}>
      <BoldText style={style.option}>{title}</BoldText>
    </Pressable>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: screenPadding.paddingHorizontal,
    },
    optionSelected: {
      borderBottomColor: primary(theme),
      borderBottomWidth: 2,
      borderStyle: 'solid',
    },
    option: {fontSize: 16, height: 30},
  });
}
