import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PantryItem } from '../../types/pantry';
import { pantryItems } from '../../data/mockData';

interface PantryState {
  pantryItems: PantryItem[];
}

// interface AddItemPayload {
//   itemId: string;
//   newItem: PantryItem;
// }

const initialState: PantryState = {
  pantryItems,
};

const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PantryItem>) => {
      state.pantryItems.unshift(action.payload);
    },
  },
});

export const { addItem } = pantrySlice.actions;
export default pantrySlice.reducer;
