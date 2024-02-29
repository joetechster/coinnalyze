import {StyleSheet, View} from 'react-native';
import {Theme, screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import AddButton from './AddButton';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import storage from '../storage';
import {Suspense, useEffect, useState} from 'react';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';

interface FavouritesProps {
  show: boolean;
}
export default function Favourites({show}: FavouritesProps) {
  const [symbols, setSymbols] = useState<string[] | null>(null);
  const {style} = useTheme(styleDecorator);
  useEffect(() => {
    storage
      .load({key: 'favourites'})
      .then(res => {
        setSymbols(res);
      })
      .catch(e => console.log(e));
  }, []);
  if (!symbols) return null;

  return (
    <View style={[style.container, !show ? {display: 'none'} : null]}>
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
