import {StyleSheet, View} from 'react-native';
import {Theme, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import AddButton from './AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import {Suspense} from 'react';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';
import {selectFavourites} from '../redux_schema/favouritesSlice';
import {useAppSelector} from '../redux_schema/hooks';

export default function Favourites() {
  const symbols: string[] = useAppSelector(selectFavourites);
  const {style} = useTheme(styleDecorator);
  if (symbols.length < 1) return null;

  return (
    <View style={style.container}>
      <View style={style.listWrapper}>
        {symbols.map((symbol, i) => (
          <Suspense key={symbol} fallback={<SymbolListItemLoading />}>
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
    addButton: {
      marginLeft: 'auto',
    },
    listWrapper: {
      gap: 10,
    },
  });
}
