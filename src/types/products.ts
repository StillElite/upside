export interface IngredientItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface Product {
  id: string;
  name: string;
  sellPrice: number;
  ingredients: IngredientItem[];
}
