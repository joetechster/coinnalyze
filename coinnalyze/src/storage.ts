import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from '..';
import {SYMBOLS_QUERY} from './globals';

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
    favourites: async () => {
      const symbols = ['BTCUSDT', 'BNBUSDT', 'ETHUSDT', 'LTCUSDT'];
      storage.save({
        key: 'favourites',
        data: symbols,
      });
      return symbols;
    },
    symbols: async () => {
      console.log('Fetching all symbols');
      const allSymbols = await client.query({
        query: SYMBOLS_QUERY,
      });
      console.log('All symbols gotten', allSymbols);
      storage.save({
        key: 'symbols',
        data: allSymbols.data.symbols,
      });
      return allSymbols;
    },
  },
});

export default storage;
