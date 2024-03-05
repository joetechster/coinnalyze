import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import {Theme, fontFamilies, onBackground, primary} from '../globals';
import Symbols from '../components/Symbols';
import {screenPadding} from '../globals';
import useTheme from '../hooks/useTheme';
import {selectLoosers} from '../redux_schema/loosersSlice';
import {useOnMounted} from '../hooks/useOnMounted';
import Loading from '../components/Loading';
import {selectFeatured} from '../redux_schema/featuredSlice';
import {selectFavourites} from '../redux_schema/favouritesSlice';

const Tab = createMaterialTopTabNavigator();
const Loosers = () => <Symbols selector={selectLoosers} />;
const Featured = () => <Symbols selector={selectFeatured} />;
const Favourites = () => <Symbols selector={selectFavourites} />;

export default function Markets() {
  const {style} = useTheme(styleDecorator);
  const {mounted} = useOnMounted();
  if (!mounted) return <Loading />;

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarStyle: style.tabBarStyle,
        tabBarItemStyle: style.tabBarItemStyle,
        tabBarLabelStyle: style.tabBarLabelStyle,
        tabBarIndicatorStyle: style.tabBarIndicatorStyle,
        tabBarIndicatorContainerStyle: style.tabBarIndicatorContainerStyle,
      }}>
      <Tab.Screen name="Hot" component={Featured} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Gainers" component={Symbols} />
      <Tab.Screen name="Loosers" component={Loosers} />
    </Tab.Navigator>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    tabBarStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: screenPadding.paddingHorizontal,
      elevation: 0,
      height: 30,
      alignItems: 'stretch',
    },
    tabBarItemStyle: {
      width: 'auto',
      justifyContent: 'flex-start',
      padding: 0,
    },
    tabBarLabelStyle: {
      color: onBackground(theme),
      fontFamily: fontFamilies.bold,
      fontSize: 12,
    },
    tabBarIndicatorStyle: {backgroundColor: primary(theme)},
    tabBarIndicatorContainerStyle: {
      left: screenPadding.paddingHorizontal,
    },
  });
}
