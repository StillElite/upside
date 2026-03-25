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

interface UpdateIngredientPayload {
  productId: string;
  updatedIngredient: IngredientItem;
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
    addIngredient: (state, action: PayloadAction<AddIngredientPayload>) => {
      const { productId, newIngredient } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product) return;

      product.ingredients.push(newIngredient);
    },
    editIngredient: (state, action: PayloadAction<UpdateIngredientPayload>) => {
      const { productId, updatedIngredient } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product) return;
      const ingredient = product.ingredients.find(
        (ingredient) => ingredient.id === updatedIngredient.id,
      );

      if (!ingredient) return;

      ingredient.name = updatedIngredient.name;
      ingredient.quantity = updatedIngredient.quantity;
      ingredient.unit = updatedIngredient.unit;
      ingredient.cost = updatedIngredient.cost;
    },
  },
});

export const {
  addProduct,
  setSelectedProductId,
  addIngredient,
  editIngredient,
} = productSlice.actions;
export default productSlice.reducer;
