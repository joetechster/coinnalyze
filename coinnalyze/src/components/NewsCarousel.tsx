import {FlatList, Image, StyleSheet, View} from 'react-native';
import sample from '../Sample_Report.json';
import {ExtraBoldText, MediumText} from './Text';
import {Theme, background, screenPadding, surface} from '../globals';
import useTheme from '../hooks/useTheme';
const news = sample.results.filter(singleNews => singleNews.image_url);

export default function NewsCarousel() {
  const {style} = useTheme(styleDecorator);
  return (
    <>
      <ExtraBoldText style={style.header}>News</ExtraBoldText>
      <FlatList
        horizontal
        contentContainerStyle={style.container}
        data={news}
        renderItem={({item}) => (
          <View style={style.item}>
            <Image source={{uri: item.image_url!}} style={style.image} />
            <MediumText numberOfLines={1}>{item.title}</MediumText>
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
      backgroundColor: background(theme),
    },
  });
}
