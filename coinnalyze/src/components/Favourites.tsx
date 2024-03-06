import {Suspense} from 'react';
import {
  selectFavourites,
  selectFavouritesPreview,
} from '../redux_schema/favouritesSlice';
import {Theme, screenPadding} from '../globals';
import AddButton from './AddButton';
import useTheme from '../hooks/useTheme';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../redux_schema/hooks';
import DollarIcon from '../../assets/icons/dollar-icon.svg';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';
import styleDecorator from '../styles/List_styles';
import {TickerOfficial} from '../__generated__/graphql';
import {Link} from '@react-navigation/native';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from './Loading';

interface FavouritesProps {
  preview?: boolean;
}

export default function Favourites({preview = false}: FavouritesProps) {
  const symbols: TickerOfficial[] = useAppSelector(
    preview ? selectFavouritesPreview : selectFavourites,
  );
  const {style} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();

  if (symbols.length < 1) return null;
  if (!mounted) return <Loading />;

  if (preview)
    return (
      <View style={style.listWrapper}>
        {symbols.map((ticker, i) => (
          <Suspense key={ticker.symbol} fallback={<SymbolListItemLoading />}>
            <SymbolListItem
              symbol={ticker.symbol!}
              Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
            />
          </Suspense>
        ))}
        <Link to={'/Markets/Favourites'}>See More</Link>
      </View>
    );
  return (
    <FlatList
      data={symbols}
      contentContainerStyle={style.listWrapper}
      renderItem={({item}) => (
        <Suspense key={item.symbol} fallback={<SymbolListItemLoading />}>
          <SymbolListItem
            symbol={item.symbol!}
            Left={<AddButton height={48} width={48} Icon={DollarIcon} />}
          />
        </Suspense>
      )}
    />
  );
}
