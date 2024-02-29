import storage from '../storage';
import {updateFavourites} from './favouritesSlice';
import {updateFeatured} from './featuredSlice';
import {updateKpi} from './kpiSlice';
import store from './store';

const dispatch = store.dispatch;

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
})();
