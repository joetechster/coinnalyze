import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from '..';
import {SYMBOLS_QUERY} from './globals';
import {TickerOfficial} from './__generated__/graphql';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    kpi: async () => {
      const initial = 'BTCUSDT';
      storage.save({
        key: 'kpi',
        data: initial,
      });
      return initial;
    },
    favourites: async () => {
      const initial = ['BTCUSDT', 'BNBUSDT', 'ETHUSDT', 'LTCUSDT'];
      const symbols = (
        await client.query({
          query: SYMBOLS_QUERY,
          variables: {symbols: initial},
        })
      ).data.symbols;
      storage.save({
        key: 'favourites',
        data: symbols,
        expires: 1,
      });
      return symbols;
    },
    featured: async () => {
      const initial = ['BTCUSDT', 'ETHUSDT'];
      const symbols = (
        await client.query({
          query: SYMBOLS_QUERY,
          variables: {symbols: initial},
        })
      ).data.symbols;
      storage.save({
        key: 'featured',
        data: symbols,
        expires: 1,
      });
      return symbols;
    },
    compare: async () => {
      const symbols = await storage
        .load<TickerOfficial[]>({key: 'featured'})
        .then(featured => featured.slice(0, 2).map(ticker => ticker.symbol));
      storage.save({
        key: 'compare',
        data: symbols,
        expires: null,
      });
      return symbols;
    },
    symbols: async () => {
      console.log('syncing symbols');
      const allSymbols = (
        await client.query({
          query: SYMBOLS_QUERY,
        })
      ).data.symbols.filter(ticker => ticker.symbol?.includes('USDT'));

      storage.save({
        key: 'symbols',
        data: allSymbols,
        expires: 1,
      });
      return allSymbols;
    },
  },
});

export default storage;
