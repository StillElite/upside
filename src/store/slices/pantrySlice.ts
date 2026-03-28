import { createSlice } from '@reduxjs/toolkit';
import { PantryItems } from '../../types/pantry';
import { pantryItems } from '../../data/mockData';

interface PantryState {
  pantryItems: PantryItems[];
}

const initialState: PantryState = {
  pantryItems,
};

const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {},
});

export const {} = pantrySlice.actions;
export default pantrySlice.reducer;
