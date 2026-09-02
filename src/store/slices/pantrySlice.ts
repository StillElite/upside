import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PantryItem } from '../../types/pantry';
import { pantryItems } from '../../data/mockData';

interface PantryState {
  pantryItems: PantryItem[];
}

interface UpdatePantryItemPayload {
  updatedPantryItem: PantryItem;
}

interface DeletePantryItemPayload {
  pantryItemId: string;
}

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
    editItem: (state, action: PayloadAction<UpdatePantryItemPayload>) => {
      const { updatedPantryItem } = action.payload;
      const pantryItem = state.pantryItems.find(
        (item) => item.id === updatedPantryItem.id,
      );
      if (!pantryItem) return;

      pantryItem.name = updatedPantryItem.name;
      pantryItem.packagePrice = updatedPantryItem.packagePrice;
      pantryItem.packageSize = updatedPantryItem.packageSize;
      pantryItem.packageUnit = updatedPantryItem.packageUnit;
    },
    deleteItem: (state, action: PayloadAction<DeletePantryItemPayload>) => {
      state.pantryItems = state.pantryItems.filter(
        (pantryItem) => pantryItem.id !== action.payload.pantryItemId,
      );
    },
  },
});

export const { addItem, editItem, deleteItem } = pantrySlice.actions;
export default pantrySlice.reducer;
