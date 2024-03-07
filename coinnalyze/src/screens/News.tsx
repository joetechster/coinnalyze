import {memo} from 'react';
import {
  NEWS_QUERY,
  Theme,
  onBackgroundFaint,
  screenPadding,
  surface,
} from '../globals';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import {FlatList} from 'react-native-gesture-handler';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import Text, {BoldText, LightText} from '../components/Text';
import {useQuery} from '@apollo/client';
import {News as NewsType} from '../__generated__/graphql';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

export default function News() {
  const {style} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();
  const {data, loading} = useQuery(NEWS_QUERY);

  if (!mounted || loading) return <Loading />;

  return (
    <FlatList
      contentContainerStyle={style.container}
      data={data?.news?.results?.filter(n => n?.image_url)}
      renderItem={({item}) => <NewsItem singleNews={item!} />}
    />
  );
}
const NewsItem = memo(({singleNews}: {singleNews: NewsType}) => {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <Pressable style={style.item}>
      <Image
        source={{uri: singleNews.image_url ?? undefined}}
        style={style.newsImage}
      />
      <View style={style.subSection}>
        <LightText style={style.date}>
          {new Date(singleNews.pubDate!).toDateString()}
        </LightText>
        <BoldText numberOfLines={3}>{singleNews.title}</BoldText>
        <Text numberOfLines={2} style={style.newsDescription}>
          {singleNews.description}
        </Text>
      </View>
    </Pressable>
  );
});
function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {...screenPadding, gap: 10},
    item: {
      width: 'auto',
      borderRadius: 10,
      backgroundColor: surface(theme),
      overflow: 'hidden',
    },
    newsImage: {
      width: '100%',
      objectFit: 'cover',
      aspectRatio: 1.5,
      backgroundColor: onBackgroundFaint(theme),
    },
    newsDescription: {
      color: onBackgroundFaint(theme),
    },
    subSection: {
      padding: 10,
    },
    date: {
      fontSize: 10,
      textAlign: 'right',
    },
  });
}
