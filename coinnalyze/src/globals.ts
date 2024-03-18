import {Dimensions, ViewStyle} from 'react-native';
import {gql} from './__generated__';

export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export const fontFamilies = {
  medium: 'Inter-Medium',
  thin: 'Inter-Thin',
  extraBold: 'Inter-ExtraBold',
  bold: 'Inter-Bold',
  light: 'Inter-Light',
  regular: 'Inter-Regular',
} as const;

export type FontFamiily = (typeof fontFamilies)[keyof typeof fontFamilies];

export type Theme = (typeof themes)[keyof typeof themes];

export const primary = (theme: Theme) =>
  theme === themes.dark ? '#38E078' : '#17994A';

export const screenPadding = {
  paddingHorizontal: 16,
  paddingVertical: 20,
};

export const background = (theme: Theme) =>
  theme === themes.dark ? '#141414' : '#FFFFFF';

export const onBackgroundFaint = (theme: Theme) =>
  theme === themes.dark ? '#C4C4C4' : '#939393';

export const onBackground = (theme: Theme) =>
  theme === themes.dark ? '#FFFFFF' : '#141414';

export const surface = (theme: Theme) =>
  theme === themes.dark ? '#292929' : '#F5F5F5';

export const onSurface = (theme: Theme) =>
  theme === themes.dark ? '#FFFFFF' : '#141414';

export const api_uri = false //__DEV__
  ? 'http://192.168.0.3:4000/graphql'
  : 'https://coinnalyze.onrender.com/graphql';

export const GRAPH_HEIGHT = 250;

export const GRAPH_WIDTH = Dimensions.get('window').width;

export const TICKER_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription subscribeToTickers($symbols: [String!]!) {
    ticker(symbols: $symbols) {
      curDayClose
      closeTime
      prevDayClose
      priceChangePercent
      symbol
    }
  }
`);

export const TICKER_QUERY = gql(/* GraphQL */ `
  query getTickers($symbols: [String!]!) {
    tickers(symbols: $symbols) {
      lastPrice
      prevClosePrice
      priceChangePercent
      symbol
    }
  }
`);

export const CANDLES_QUERY = gql(/* GraphQL */ `
  query getCandles($symbol: String!) {
    candles(symbol: $symbol) {
      close
      closeTime
    }
  }
`);

export const SYMBOLS_QUERY = gql(/* GraphQL */ `
  query getSymbols($symbols: [String]) {
    symbols(symbols: $symbols) {
      symbol
      lastPrice
      priceChangePercent
    }
  }
`);

export const NEWS_QUERY = gql(/* GraphQL */ `
  query getNews($nextPage: String) {
    news(nextPage: $nextPage) {
      results {
        title
        image_url
        description
        pubDate
      }
      nextPage
    }
  }
`);
