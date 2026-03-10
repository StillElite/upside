export interface IngredientItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface Product {
  id: number;
  name: string;
  sellPrice: number;
  ingredients: IngredientItem[];
}
