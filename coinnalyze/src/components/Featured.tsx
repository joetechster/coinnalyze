import {StyleSheet, View} from 'react-native';
import {Theme, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import AddButton from './AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';
import {Suspense} from 'react';
import {useSelector} from 'react-redux';
import {selectFeatured} from '../redux_schema/featuredSlice';

export default function Featured() {
  const symbols = useSelector(selectFeatured);
  const {style} = useTheme(styleDecorator);
  if (symbols.length < 0) return null;
  return (
    <View style={style.container}>
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
