import React, {useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import useTheme from './hooks/useTheme';
import Home from './screens/Home';
import News from './screens/News';
import Comopare from './screens/Compare';
import Markets from './screens/Markets';
import Settings from './screens/Settings';
import {BoldText} from './components/Text';
import TabBarIcon from './components/TabBarIcon';
import HomeIcon from '../assets/icons/home-icon.svg';
import CompareIcon from '../assets/icons/compare-icon.svg';
import NewsIcon from '../assets/icons/news-icon.svg';
import MarketIcon from '../assets/icons/bar-icon.svg';
import SettingsIcon from '../assets/icons/settings-icon.svg';
import {Theme, background, onBackground, surface} from './globals';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SymbolPicker from './screens/SymbolPicker';

export type StackParamList = {
  MyTabNavigator: undefined;
  'Pick Symbol': {callback: (symbol: string) => any};
};

export type TabParamList = {
  Home: undefined;
  Compare: undefined;
  News: undefined;
  Markets: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

export default function App(): React.JSX.Element {
  const {style, theme} = useTheme(styleDecorator);
  const MyTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        color: onBackground(theme),
        background: background(theme),
      },
    }),
    [theme],
  );

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          freezeOnBlur: false,
          headerStyle: style.header,
          headerTitleAlign: 'center',
          headerTitle: ({children}) => (
            <BoldText style={style.headerTitle}>{children}</BoldText>
          ),
        }}>
        <Stack.Screen
          name="MyTabNavigator"
          component={MyTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pick Symbol"
          component={SymbolPicker}
          options={{presentation: 'modal', freezeOnBlur: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTabNavigator({
  navigation: stackNavigation,
}: StackScreenProps<StackParamList, 'MyTabNavigator'>) {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <Tab.Navigator
      screenOptions={{
        freezeOnBlur: true,
        headerStyle: style.header,
        headerTitleAlign: 'center',
        headerTitle: ({children}) => (
          <BoldText style={style.headerTitle}>{children}</BoldText>
        ),
        tabBarStyle: style.tabBar,
        tabBarShowLabel: false,
        tabBarButton: props => (
          <Pressable {...props} android_ripple={{color: background(theme)}} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Coinnalyze',
          tabBarIcon: props => (
            <TabBarIcon Icon={HomeIcon} {...props} title="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          title: 'Market News',
          tabBarIcon: props => (
            <TabBarIcon Icon={NewsIcon} {...props} title="News" />
          ),
        }}
      />
      <Tab.Screen
        name="Compare"
        component={Comopare}
        options={{
          tabBarIcon: props => (
            <TabBarIcon Icon={CompareIcon} {...props} title="Compare" />
          ),
        }}
      />
      <Tab.Screen
        name="Markets"
        component={Markets}
        options={{
          tabBarIcon: props => (
            <TabBarIcon Icon={MarketIcon} {...props} title="Markets" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: props => (
            <TabBarIcon Icon={SettingsIcon} {...props} title="Settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    header: {
      elevation: 0,
      backgroundColor: background(theme),
    },
    headerTitle: {
      fontSize: 18,
    },
    tabBar: {
      backgroundColor: surface(theme),
      borderTopWidth: 0,
      height: 55,
    },
  });
}
