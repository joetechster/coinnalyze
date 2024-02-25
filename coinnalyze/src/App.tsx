import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import useTheme from './hooks/useTheme';
import Home from './screens/Home';
import News from './screens/News';
import {
  Theme,
  background,
  onBackground,
  onSurface,
  surface,
  themes,
} from './globals';
import {BoldText} from './components/Text';
import TabBarIcon from './components/TabBarIcon';
import HomeIcon from '../assets/icons/home-icon.svg';
import ChartIcon from '../assets/icons/chart-icon.svg';
import CompareIcon from '../assets/icons/compare-icon.svg';
import ProfileIcon from '../assets/icons/profile-icon.svg';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import Profile from './screens/Profile';
import Comopare from './screens/Compare';

type StackParamList = {
  MyTabNavigator: undefined;
  Profile: undefined;
};
type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Compare: undefined;
  News: undefined;
};
const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MyTabNavigator({
  navigation: stackNavigation,
}: StackScreenProps<StackParamList, 'MyTabNavigator'>) {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: style.header,
        headerTitleAlign: 'center',
        headerTitle: ({children}) => (
          <BoldText style={style.headerTitle}>{children}</BoldText>
        ),
        tabBarStyle: style.tabBar,
        tabBarShowLabel: false,
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
            <TabBarIcon Icon={ChartIcon} {...props} title="News" />
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
        name="Profile"
        component={NavigateToStack(stackNavigation)}
        options={{
          lazy: false,
          tabBarIcon: props => (
            <TabBarIcon Icon={ProfileIcon} {...props} title="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App(): React.JSX.Element {
  const {style, theme} = useTheme(styleDecorator);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
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
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <StatusBar
        barStyle={theme === themes.dark ? 'light-content' : 'dark-content'}
        backgroundColor={style.statusBar.backgroundColor}
      />
    </>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    statusBar: {
      backgroundColor: background(theme),
    },
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

function NavigateToStack(
  stackNavigation: StackNavigationProp<StackParamList, 'MyTabNavigator'>,
) {
  return ({navigation}: BottomTabScreenProps<TabParamList, 'Profile'>) => {
    React.useLayoutEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {
        e.preventDefault();
        stackNavigation.navigate('Profile');
      });
      return unsubscribe;
    }, []);
    return null;
  };
}
