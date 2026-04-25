export interface RecipeIngredient {
  id: string;
  pantryItemId?: string;
  name: string;
  quantity: number;
  recipeUnit: string;
}

export interface Product {
  id: string;
  name: string;
  sellPrice: number;
  recipeIngredients: RecipeIngredient[];
}
