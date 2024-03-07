/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Candle = {
  __typename?: 'Candle';
  baseAssetVolume?: Maybe<Scalars['String']['output']>;
  close?: Maybe<Scalars['Float']['output']>;
  closeTime?: Maybe<Scalars['String']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  openTime?: Maybe<Scalars['String']['output']>;
  quoteAssetVolume?: Maybe<Scalars['String']['output']>;
  quoteVolume?: Maybe<Scalars['String']['output']>;
  trades?: Maybe<Scalars['Int']['output']>;
  volume?: Maybe<Scalars['String']['output']>;
};

export type News = {
  __typename?: 'News';
  ai_region?: Maybe<Scalars['String']['output']>;
  ai_tag?: Maybe<Scalars['String']['output']>;
  article_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  content?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  creator?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  language?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  pubDate?: Maybe<Scalars['String']['output']>;
  sentiment?: Maybe<Scalars['String']['output']>;
  sentiment_stats?: Maybe<Scalars['String']['output']>;
  source_icon?: Maybe<Scalars['String']['output']>;
  source_id?: Maybe<Scalars['String']['output']>;
  source_priority?: Maybe<Scalars['Int']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

export type NewsResponse = {
  __typename?: 'NewsResponse';
  nextPage?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<Maybe<News>>>;
  status?: Maybe<Scalars['String']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  candles: Array<Candle>;
  news?: Maybe<NewsResponse>;
  symbols: Array<TickerOfficial>;
  tickers: Array<TickerOfficial>;
};


export type QueryCandlesArgs = {
  symbol?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNewsArgs = {
  nextPage?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySymbolsArgs = {
  symbols?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTickersArgs = {
  symbols: Array<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  ticker: Ticker;
};


export type SubscriptionTickerArgs = {
  symbols: Array<Scalars['String']['input']>;
};

export type Ticker = {
  __typename?: 'Ticker';
  bestAsk?: Maybe<Scalars['String']['output']>;
  bestAskQnt?: Maybe<Scalars['String']['output']>;
  bestBid?: Maybe<Scalars['String']['output']>;
  bestBidQnt?: Maybe<Scalars['String']['output']>;
  closeTime?: Maybe<Scalars['String']['output']>;
  closeTradeQuantity?: Maybe<Scalars['String']['output']>;
  curDayClose?: Maybe<Scalars['Float']['output']>;
  eventTime?: Maybe<Scalars['Int']['output']>;
  eventType?: Maybe<Scalars['String']['output']>;
  firstTradeId?: Maybe<Scalars['Int']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  lastTradeId?: Maybe<Scalars['Int']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  openTime?: Maybe<Scalars['String']['output']>;
  prevDayClose?: Maybe<Scalars['Float']['output']>;
  priceChange?: Maybe<Scalars['String']['output']>;
  priceChangePercent?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  totalTrades?: Maybe<Scalars['Int']['output']>;
  volume?: Maybe<Scalars['String']['output']>;
  volumeQuote?: Maybe<Scalars['String']['output']>;
  weightedAvg?: Maybe<Scalars['String']['output']>;
};

export type TickerOfficial = {
  __typename?: 'TickerOfficial';
  askPrice?: Maybe<Scalars['Float']['output']>;
  askQty?: Maybe<Scalars['Float']['output']>;
  bidPrice?: Maybe<Scalars['Float']['output']>;
  bidQty?: Maybe<Scalars['Float']['output']>;
  closeTime?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['String']['output']>;
  firstId?: Maybe<Scalars['String']['output']>;
  highPrice?: Maybe<Scalars['Float']['output']>;
  lastId?: Maybe<Scalars['String']['output']>;
  lastPrice?: Maybe<Scalars['Float']['output']>;
  lastQty?: Maybe<Scalars['Float']['output']>;
  lowPrice?: Maybe<Scalars['Float']['output']>;
  openPrice?: Maybe<Scalars['Float']['output']>;
  openTime?: Maybe<Scalars['String']['output']>;
  prevClosePrice?: Maybe<Scalars['Float']['output']>;
  priceChange?: Maybe<Scalars['Float']['output']>;
  priceChangePercent?: Maybe<Scalars['Float']['output']>;
  quoteVolume?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weightedAvgPrice?: Maybe<Scalars['Float']['output']>;
};

export type SubscribeToTickersSubscriptionVariables = Exact<{
  symbols: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type SubscribeToTickersSubscription = { __typename?: 'Subscription', ticker: { __typename?: 'Ticker', curDayClose?: number | null, closeTime?: string | null, prevDayClose?: number | null, priceChangePercent?: number | null, symbol?: string | null } };

export type GetTickersQueryVariables = Exact<{
  symbols: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetTickersQuery = { __typename?: 'Query', tickers: Array<{ __typename?: 'TickerOfficial', lastPrice?: number | null, prevClosePrice?: number | null, priceChangePercent?: number | null, symbol?: string | null }> };

export type GetCandlesQueryVariables = Exact<{
  symbol: Scalars['String']['input'];
}>;


export type GetCandlesQuery = { __typename?: 'Query', candles: Array<{ __typename?: 'Candle', close?: number | null, closeTime?: string | null }> };

export type GetSymbolsQueryVariables = Exact<{
  symbols?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetSymbolsQuery = { __typename?: 'Query', symbols: Array<{ __typename?: 'TickerOfficial', symbol?: string | null, lastPrice?: number | null, priceChangePercent?: number | null }> };

export type GetNewsQueryVariables = Exact<{
  nextPage?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNewsQuery = { __typename?: 'Query', news?: { __typename?: 'NewsResponse', nextPage?: string | null, results?: Array<{ __typename?: 'News', title?: string | null, image_url?: string | null, description?: string | null, pubDate?: string | null } | null> | null } | null };


export const SubscribeToTickersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"subscribeToTickers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"symbols"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"curDayClose"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"prevDayClose"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<SubscribeToTickersSubscription, SubscribeToTickersSubscriptionVariables>;
export const GetTickersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTickers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"symbols"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastPrice"}},{"kind":"Field","name":{"kind":"Name","value":"prevClosePrice"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<GetTickersQuery, GetTickersQueryVariables>;
export const GetCandlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCandles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"symbol"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}}]}}]}}]} as unknown as DocumentNode<GetCandlesQuery, GetCandlesQueryVariables>;
export const GetSymbolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSymbols"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbols"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"symbols"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbols"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"lastPrice"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent"}}]}}]}}]} as unknown as DocumentNode<GetSymbolsQuery, GetSymbolsQueryVariables>;
export const GetNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextPage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nextPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextPage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pubDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}}]}}]}}]} as unknown as DocumentNode<GetNewsQuery, GetNewsQueryVariables>;