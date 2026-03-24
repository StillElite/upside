import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../../data/mockData';
import { IngredientItem, Product } from '../../types/products';

interface ProductState {
  products: Product[];
  selectedProductId: string | null;
}
interface AddIngredientPayload {
  productId: string;
  newIngredient: IngredientItem;
}

const initialState: ProductState = {
  products,
  selectedProductId: products[0].id,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    setSelectedProductId: (state, action: PayloadAction<string | null>) => {
      state.selectedProductId = action.payload;
    },
    addIngredientToProduct: (
      state,
      action: PayloadAction<AddIngredientPayload>,
    ) => {
      const { productId, newIngredient } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product) return;

      product.ingredients.push(newIngredient);
    },
  },
});

export const { addProduct, setSelectedProductId, addIngredientToProduct } =
  productSlice.actions;
export default productSlice.reducer;
