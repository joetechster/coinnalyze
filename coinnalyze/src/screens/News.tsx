import {memo} from 'react';
import {
  Theme,
  background,
  onBackground,
  onBackgroundFaint,
  screenPadding,
  surface,
} from '../globals';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import {FlatList} from 'react-native-gesture-handler';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import sample from '../Sample_Report.json';
import Text, {BoldText} from '../components/Text';

const news = sample.results.filter(singleNews => singleNews.image_url);

const BASE_URI = 'https://source.unsplash.com/random?sig=';

export default function News() {
  const {style} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();

  if (!mounted) return <Loading />;

  return (
    <FlatList
      contentContainerStyle={style.container}
      data={news}
      renderItem={({item}) => <NewsItem singleNews={item} />}
    />
  );
}
const NewsItem = memo(({singleNews}: {singleNews: (typeof news)[0]}) => {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <Pressable style={style.item}>
      <Image
        source={{uri: singleNews.image_url ?? undefined}}
        style={style.newsImage}
      />
      <View style={style.subSection}>
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
  });
}
