import {memo, useCallback, useEffect, useState} from 'react';
import {
  NEWS_QUERY,
  Theme,
  onBackgroundFaint,
  screenPadding,
  surface,
} from '../globals';
import {
  Image,
  Linking,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import {FlatList} from 'react-native-gesture-handler';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import Text, {BoldText, LightText, MediumText} from '../components/Text';
import {useQuery} from '@apollo/client';
import {News as NewsType} from '../__generated__/graphql';

export default function News() {
  const [loadingMore, setLoadingMore] = useState(false);
  const {style} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();
  const {data, loading, fetchMore} = useQuery(NEWS_QUERY);
  const renderItem: ListRenderItem<NewsType> = useCallback(
    ({item}) => <NewsItem singleNews={item} />,
    [],
  );
  const fetchMoreNews = useCallback(() => {
    setLoadingMore(true);
    fetchMore({variables: {nextPage: data?.news?.nextPage}}).finally(() =>
      setLoadingMore(false),
    );
  }, []);
  if (!mounted || loading) return <Loading />;

  return (
    <FlatList
      contentContainerStyle={style.container}
      data={data?.news?.results?.filter(n => n?.image_url)}
      renderItem={renderItem}
      ListFooterComponent={
        <Pressable style={style.loadMore} onPress={fetchMoreNews}>
          <MediumText>{loadingMore ? 'Loading...' : 'Load More'}</MediumText>
        </Pressable>
      }
    />
  );
}
const NewsItem = memo(({singleNews}: {singleNews: NewsType}) => {
  const {style} = useTheme(styleDecorator);
  const handlePress = useCallback(async () => {
    await Linking.openURL(singleNews.link!);
  }, []);
  return (
    <Pressable style={style.item} onPress={handlePress}>
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
    loadMore: {
      flex: 1,
      backgroundColor: surface(theme),
      padding: 10,
      alignItems: 'center',
      borderRadius: 10,
    },
  });
}
