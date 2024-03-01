import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import favouritesReducer from './favouritesSlice';
import kpiReducer from './kpiSlice';
import featuredReducer from './featuredSlice';
import compareReducer from './compareSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    favourites: favouritesReducer,
    kpi: kpiReducer,
    featured: featuredReducer,
    compare: compareReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
