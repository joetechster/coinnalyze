import {View} from 'react-native';
import useTheme from '../hooks/useTheme';
import SymbolListItem, {SymbolListItemLoading} from './SymbolListItem';
import {Suspense} from 'react';
import {useSelector} from 'react-redux';
import {selectFeatured} from '../redux_schema/featuredSlice';
import {FlatList} from 'react-native-gesture-handler';
import styleDecorator from '../styles/List_styles';
import {Link} from '@react-navigation/native';
import Text from './Text';

interface FeaturedProps {
  preview?: boolean;
}

export default function Featured({preview = false}: FeaturedProps) {
  const symbols = useSelector(selectFeatured);
  const {style} = useTheme(styleDecorator);
  if (symbols.length < 0) return null;
  if (preview)
    return (
      <View style={style.listWrapper}>
        {symbols.map((ticker, i) => (
          <Suspense key={ticker.symbol} fallback={<SymbolListItemLoading />}>
            <SymbolListItem symbol={ticker.symbol!} />
          </Suspense>
        ))}
        <Link to={'/Markets/Featured'}>
          <Text>See More</Text>
        </Link>
      </View>
    );
  return (
    <FlatList
      contentContainerStyle={style.listWrapper}
      data={symbols}
      renderItem={({item}) => (
        <Suspense key={item.symbol} fallback={<SymbolListItemLoading />}>
          <SymbolListItem symbol={item.symbol!} />
        </Suspense>
      )}
    />
  );
}
