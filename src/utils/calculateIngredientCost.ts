import { GRAMS_PER_LB, GRAMS_PER_OZ } from '../constants/conversions';

export const calculateIngredientCost = (
  packageSize: number,
  packageUnit: string,
  packagePrice: number,
  gramsPerCup: number | undefined,
  quantity: number,
  recipeUnit: string,
): number => {
  if (!packageSize || !packagePrice) return 0;

  if (recipeUnit === 'each') {
    const costPerItem = packagePrice / packageSize;
    return quantity * costPerItem;
  }
  let totalPackageGrams = 0;

  if (packageUnit === 'lb') {
    totalPackageGrams = packageSize * GRAMS_PER_LB;
  } else if (packageUnit === 'oz') {
    totalPackageGrams = packageSize * GRAMS_PER_OZ;
  }

  if (!totalPackageGrams) return 0;

  let recipeGrams = 0;

  switch (recipeUnit) {
    case 'cup':
      if (gramsPerCup !== undefined) {
        // baking items
        recipeGrams = quantity * gramsPerCup;
      } else if (packageUnit === 'oz') {
        // liquids
        const recipeOunces = quantity * 8;
        const costPerOunce = packagePrice / packageSize;
        return recipeOunces * costPerOunce;
      }
      break;

    case 'tbsp':
      if (gramsPerCup !== undefined) {
        recipeGrams = quantity * (gramsPerCup / 16);
      } else if (packageUnit === 'oz') {
        const recipeOunces = quantity * (8 / 16);
        const costPerOunce = packagePrice / packageSize;
        return recipeOunces * costPerOunce;
      }
      break;

    case 'tsp':
      if (gramsPerCup !== undefined) {
        recipeGrams = quantity * (gramsPerCup / 48);
      } else if (packageUnit === 'oz') {
        const recipeOunces = quantity * (8 / 48);
        const costPerOunce = packagePrice / packageSize;
        return recipeOunces * costPerOunce;
      }
      break;

    case 'oz':
      recipeGrams = quantity * 28.3495;
      break;

    case 'g':
      recipeGrams = quantity;
      break;

    default:
      recipeGrams = 0;
  }

  if (!recipeGrams) return 0;

  const costPerGram = packagePrice / totalPackageGrams;
  const ingredientCost = recipeGrams * costPerGram;

  return ingredientCost;
};
