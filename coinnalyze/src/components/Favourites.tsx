import {FlatList, StyleSheet, View} from 'react-native';
import {Theme, screenPadding} from '../globals';
import {BoldText, MediumText} from './Text';
import useTheme from '../hooks/useTheme';
import AddButton from './AddButton';
import ListItem from './ListItem';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
const data = [
  {
    title: 'I am a title',
    rightText: '4040',
    rightSubText: 'Sub',
    subTitle: 'Coinbase',
  },
  {
    title: 'I am a title',
    rightText: '4040',
    rightSubText: 'Sub',
    subTitle: 'Coinbase',
  },
  {
    title: 'I am a title',
    rightText: '4040',
    rightSubText: 'Sub',
    subTitle: 'Coinbase',
  },
];
export default function Favourites() {
  const {style} = useTheme(styleDecorator);
  return (
    <View style={style.container}>
      <View style={{flexDirection: 'row'}}>
        <BoldText style={style.header}>Favourites</BoldText>
        <AddButton style={style.addButton} />
      </View>
      <View style={style.listWrapper}>
        {data.map((item, i) => (
          <ListItem
            {...item}
            key={i}
            Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
          />
        ))}
      </View>
    </View>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: screenPadding.paddingHorizontal,
      gap: 10,
    },
    header: {
      fontSize: 22,
    },
    addButton: {
      marginLeft: 'auto',
    },
    listWrapper: {
      gap: 10,
    },
  });
}
