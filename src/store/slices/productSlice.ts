import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../../data/mockData';
import { RecipeIngredient, Product } from '../../types/products';

interface ProductState {
  products: Product[];
  selectedProductId: string | null;
}
interface AddIngredientPayload {
  productId: string;
  newIngredient: RecipeIngredient;
}

interface UpdateIngredientPayload {
  productId: string;
  updatedIngredient: RecipeIngredient;
}

interface DeleteProductPayload {
  productId: string;
}

interface DeleteIngredientPayload {
  productId: string;
  ingredientId: string;
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

    deleteProduct: (state, action: PayloadAction<DeleteProductPayload>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.productId,
      );
    },
    setSelectedProductId: (state, action: PayloadAction<string | null>) => {
      state.selectedProductId = action.payload;
    },
    addIngredient: (state, action: PayloadAction<AddIngredientPayload>) => {
      const { productId, newIngredient } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product) return;

      product.recipeIngredients.push(newIngredient);
    },
    editIngredient: (state, action: PayloadAction<UpdateIngredientPayload>) => {
      const { productId, updatedIngredient } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product) return;
      const ingredient = product.recipeIngredients.find(
        (ingredient) => ingredient.id === updatedIngredient.id,
      );

      if (!ingredient) return;

      ingredient.name = updatedIngredient.name;
      ingredient.quantity = updatedIngredient.quantity;
      ingredient.recipeUnit = updatedIngredient.recipeUnit;
    },
    deleteIngredient: (
      state,
      action: PayloadAction<DeleteIngredientPayload>,
    ) => {
      const { productId, ingredientId } = action.payload;

      const product = state.products.find((item) => item.id === productId);

      if (!product) return;

      product.recipeIngredients = product.recipeIngredients.filter(
        (ingredient) => ingredient.id !== ingredientId,
      );
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  setSelectedProductId,
  addIngredient,
  editIngredient,
  deleteIngredient,
} = productSlice.actions;
export default productSlice.reducer;
