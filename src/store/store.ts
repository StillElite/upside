import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import pantryReducer from './slices/pantrySlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    pantry: pantryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
