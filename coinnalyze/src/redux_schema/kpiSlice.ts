import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

// Define the initial state using that type
const initialState = '';

export const kpiSlice = createSlice({
  name: 'kpi',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateKpi: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const {updateKpi} = kpiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectKpi = (state: RootState) => state.kpi;

export default kpiSlice.reducer;
