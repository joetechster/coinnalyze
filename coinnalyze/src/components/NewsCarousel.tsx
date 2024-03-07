import {FlatList, Image, StyleSheet, View} from 'react-native';
import {ExtraBoldText, MediumText} from './Text';
import {NEWS_QUERY, Theme, screenPadding, surface} from '../globals';
import useTheme from '../hooks/useTheme';
import {useSuspenseQuery} from '@apollo/client';
import {useState} from 'react';

export default function NewsCarousel() {
  const {style} = useTheme(styleDecorator);
  const {data} = useSuspenseQuery(NEWS_QUERY);

  return (
    <>
      <ExtraBoldText style={style.header}>News</ExtraBoldText>
      <FlatList
        horizontal
        contentContainerStyle={style.container}
        data={data.news?.results?.filter(singleNews => singleNews?.image_url)}
        renderItem={({item}) => (
          <View style={style.item}>
            <Image source={{uri: item?.image_url!}} style={style.image} />
            <MediumText numberOfLines={1}>{item?.title}</MediumText>
          </View>
        )}
      />
    </>
  );
}

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
