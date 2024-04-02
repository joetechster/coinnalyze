import {
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {ExtraBoldText, MediumText} from './Text';
import {NEWS_QUERY, Theme, screenPadding, surface} from '../globals';
import useTheme from '../hooks/useTheme';
import {useSuspenseQuery} from '@apollo/client';
import {Suspense, memo, useCallback, useState} from 'react';
import {News} from '../__generated__/graphql';
import Refreshable, {RefreshableProps} from './Refreshable';
import {ErrorBoundary, ErrorBoundaryProps} from '../errorHandling';

export default function NewsCarousel(
  props: ErrorBoundaryProps & RefreshableProps,
) {
  return (
    <Refreshable
      refreshing={props.refreshing}
      fallback={<NewsCarouselLoading />}>
      <ErrorBoundary fallback={<NewsCarouselLoading />}>
        <Suspense fallback={<NewsCarouselLoading />}>
          <NewsCarouselInner />
        </Suspense>
      </ErrorBoundary>
    </Refreshable>
  );
}

function NewsCarouselInner() {
  const {style} = useTheme(styleDecorator);
  const {data} = useSuspenseQuery(NEWS_QUERY);
  const renderNewsItem: ListRenderItem<News> = useCallback(
    ({item}) => <NewsItem item={item} />,
    [],
  );

  return (
    <>
      <ExtraBoldText style={style.header}>News</ExtraBoldText>
      <FlatList
        horizontal
        contentContainerStyle={style.container}
        data={data.news?.results?.filter(singleNews => singleNews?.image_url)}
        renderItem={renderNewsItem}
      />
    </>
  );
}

const NewsItem = memo(({item}: {item: News}) => {
  const {style} = useTheme(styleDecorator);
  const handlePress = useCallback(async () => {
    await Linking.openURL(item.link!);
  }, []);
  return (
    <Pressable style={style.item} onPress={handlePress}>
      <Image source={{uri: item?.image_url!}} style={style.image} />
      <MediumText numberOfLines={1}>{item?.title}</MediumText>
    </Pressable>
  );
});
function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    container: {
      gap: 10,
      paddingHorizontal: screenPadding.paddingHorizontal,
      paddingBottom: 10,
      flexDirection: 'row',
    },
    header: {paddingHorizontal: screenPadding.paddingHorizontal, fontSize: 20},
    item: {
      width: 250,
      borderRadius: 10,
      gap: 10,
    },
    image: {
      width: '100%',
      aspectRatio: 1.6,
      borderRadius: 10,
      backgroundColor: surface(theme),
    },
    titleLoading: {
      height: 20,
      borderRadius: 5,
      width: '100%',
      backgroundColor: surface(theme),
    },
  });
}

export function NewsCarouselLoading() {
  const {style} = useTheme(styleDecorator);

  return (
    <>
      <ExtraBoldText style={style.header}>News</ExtraBoldText>
      <View style={style.container}>
        {[1, 2, 3].map(i => (
          <View style={style.item} key={i}>
            <View style={style.image}></View>
            <View style={style.titleLoading}></View>
          </View>
        ))}
      </View>
    </>
  );
}
