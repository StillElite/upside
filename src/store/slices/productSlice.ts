import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '../../data/mockData';
import { Product } from '../../types/products';

interface ProductState {
  products: Product[];
  selectedProductId: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProductId: initialProducts[0].id,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
  },
});

export const { setSelectedProductId } = productSlice.actions;
export default productSlice.reducer;
