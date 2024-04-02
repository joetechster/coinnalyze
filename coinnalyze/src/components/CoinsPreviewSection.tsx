import {StyleSheet, View} from 'react-native';
import {Theme, primary, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import {useState} from 'react';
import {Pressable} from 'react-native';
import {BoldText} from './Text';
import Favourites from './Favourites';
import Featured from './Featured';
import {ErrorBoundary, ErrorBoundaryProps} from '../errorHandling';
import Refreshable, {RefreshableProps} from './Refreshable';

const Tabs = [<Favourites preview />, <Featured preview />];

export default function CoinsPreviewSection(
  props: ErrorBoundaryProps & RefreshableProps,
) {
  return (
    <Refreshable refreshing={props.refreshing}>
      <ErrorBoundary>
        <CoinsPreviewSectionInner />
      </ErrorBoundary>
    </Refreshable>
  );
}
function CoinsPreviewSectionInner() {
  const {style} = useTheme(styleDecorator);
  const [index, setIndex] = useState(0);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Option
          title="Favourites"
          onPress={() => setIndex(0)}
          selected={index === 0}
        />
        <Option
          title="Featured"
          onPress={() => setIndex(1)}
          selected={index === 1}
        />
      </View>
      {Tabs[index]}
    </View>
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
    container: {
      gap: 10,
    },
    header: {
      paddingHorizontal: screenPadding.paddingHorizontal,
      flexDirection: 'row',
      gap: 10,
    },
    optionSelected: {
      borderBottomColor: primary(theme),
      borderBottomWidth: 2,
      borderStyle: 'solid',
    },
    option: {fontSize: 16, height: 30},
  });
}
