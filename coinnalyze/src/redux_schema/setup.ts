import {client} from '../..';
import {TickerOfficial} from '../__generated__/graphql';
import {SYMBOLS_QUERY} from '../globals';
import storage from '../storage';
import {updateCompare} from './compareSlice';
import {updateFavourites} from './favouritesSlice';
import {updateFeatured} from './featuredSlice';
import {selectGainers, updateGainers} from './gainersSlice';
import {updateKpi} from './kpiSlice';
import {updateLoosers} from './loosersSlice';
import store from './store';
import {updateSymbols} from './symbolsSlice';

const dispatch = store.dispatch;

// initialize redux with initial variables
(function setup() {
  // Setup initial kpi from local storage
  storage.load({key: 'kpi'}).then(kpi => {
    dispatch(updateKpi(kpi));
  });
  // Setup initial favourites from local storage
  storage.load<TickerOfficial[]>({key: 'favourites'}).then(favourites => {
    dispatch(updateFavourites(favourites));
    // Update the info in the store asynchronously
    const symbols = favourites.map(ticker => ticker.symbol!);
    client
      .query({
        query: SYMBOLS_QUERY,
        variables: {symbols},
      })
      .then(res => {
        const rearrangedTickers = symbols.map(symbol => {
          return res.data.symbols.find(
            ticker => ticker.symbol === symbol,
          ) as TickerOfficial;
        });
        dispatch(updateFavourites(rearrangedTickers));
      });
  });
  // Setup initial featured from local storage
  storage.load({key: 'featured'}).then(featured => {
    dispatch(updateFeatured(featured));
  });
  // setup initial compareSymbols from local storage
  storage.load({key: 'compare'}).then(compare => {
    dispatch(updateCompare(compare));
  });
  // Setup initial symbols from local storage
  storage.load({key: 'symbols'}).then((symbols: TickerOfficial[]) => {
    dispatch(updateSymbols(symbols));
    // Setup initial gainers
    const symbolsSorted = sortByGain(symbols).filter(
      ticker => ticker.priceChangePercent !== 0,
    );
    const firstNegativeIndex = symbolsSorted.findIndex(
      ticker => ticker.priceChangePercent! < 0,
    );
    const gainers = symbolsSorted.slice(0, firstNegativeIndex);
    const loosers = symbolsSorted.slice(firstNegativeIndex).reverse();
    dispatch(updateGainers(gainers));
    dispatch(updateLoosers(loosers));
  });
})();

function sortByGain(symbols: TickerOfficial[]) {
  return [...symbols].sort((a, b) => {
    const aGain = a.priceChangePercent!;
    const bGain = b.priceChangePercent!;
    // Sort in decending order
    if (aGain < bGain) return 1;
    else if (aGain > bGain) return -1;
    else return 0;
  });
}
