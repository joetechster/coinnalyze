import Text from '../components/Text';
import {Image} from '@rneui/themed';
import {useState} from 'react';
import {Theme, screenPadding, surface} from '../globals';
import {
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import MyButton from '../components/Button';
import MySeearchBar from '../components/SearchBar';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

export default function News() {
  const {style, theme} = useTheme(styleDecorator);
  const [search, setSearch] = useState('');
  const [loadingNews, setLoadingNews] = useState(false);
  const {mounted} = useOnMounted();

  if (!mounted) return <Loading />;

  const updateNews = (e: GestureResponderEvent) => {
    // Update logic here
    setTimeout(() => setLoadingNews(prev => !prev), 1000);
    setLoadingNews(prev => !prev);
  };
  return (
    <View>
      <FlatList
        contentContainerStyle={style.container}
        ListHeaderComponent={
          <MySeearchBar value={search} onChangeText={text => setSearch(text)} />
        }
        data={[...new Array(10)].map((_, i) => i.toString())}
        renderItem={({item}) => (
          <ListItem
            Left={
              <Image
                source={{uri: BASE_URI + item}}
                containerStyle={style.item}
              />
            }
            title={item}
          />
        )}
        ListFooterComponent={
          <MyButton loading={loadingNews} onPress={updateNews} />
        }
      />
    </View>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding, gap: 10},
    item: {
      aspectRatio: 1,

      width: 48,
      flex: 1,
      borderRadius: 8,
      backgroundColor: surface(theme),
    },
  });
}
