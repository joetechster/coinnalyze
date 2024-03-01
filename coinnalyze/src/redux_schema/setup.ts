import storage from '../storage';
import {updateCompare} from './compareSlice';
import {updateFavourites} from './favouritesSlice';
import {updateFeatured} from './featuredSlice';
import {updateKpi} from './kpiSlice';
import store from './store';

const dispatch = store.dispatch;

// initialize redux with initial variables
(function setup() {
  // Setup initial kpi from local storage
  storage.load({key: 'kpi'}).then(kpi => {
    dispatch(updateKpi(kpi));
  });
  // Setup initial favourites from local storage
  storage.load({key: 'favourites'}).then(favourites => {
    dispatch(updateFavourites(favourites));
  });
  // Setup initial featured from local storage
  storage.load({key: 'featured'}).then(featured => {
    dispatch(updateFeatured(featured));
  });
  // setup initial compareSymbols from local storage
  storage.load({key: 'compare'}).then(compare => {
    dispatch(updateCompare(compare));
  });
})();
