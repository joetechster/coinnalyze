import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {Theme, screenPadding} from '../globals';
import {BoldText, MediumText} from './Text';
import useTheme from '../hooks/useTheme';
import AddButton from './AddButton';
import ListItem from './ListItem';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';
import {Suspense} from 'react';

const symbols = ['BTCUSDT', 'ETHUSDT', 'LTCUSDT'];

interface FeaturedProps {
  show: boolean;
}

export default function Featured({show}: FeaturedProps) {
  const {style} = useTheme(styleDecorator);
  return (
    <View style={[style.container, !show ? {display: 'none'} : null]}>
      <View style={style.listWrapper}>
        {symbols.map((symbol, i) => (
          <Suspense key={symbol + i} fallback={<SymbolListItemLoading />}>
            <SymbolListItem
              symbol={symbol}
              Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
            />
          </Suspense>
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
