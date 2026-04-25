import {
  GRAMS_PER_LB,
  GRAMS_PER_OZ,
  OUNCES_PER_CUP,
  TBSP_PER_CUP,
  TSP_PER_CUP,
} from '../constants/conversions';

const getTotalPackageGrams = (
  packageSize: number,
  packageUnit: string,
): number => {
  if (packageUnit === 'lb') {
    return packageSize * GRAMS_PER_LB;
  }

  if (packageUnit === 'oz') {
    return packageSize * GRAMS_PER_OZ;
  }

  if (packageUnit === 'g') {
    return packageSize;
  }

  return 0;
};

const getVolumeCost = (
  quantity: number,
  recipeUnit: string,
  packageSize: number,
  packagePrice: number,
): number | null => {
  if (recipeUnit === 'cup') {
    const recipeOunces = quantity * OUNCES_PER_CUP;
    const costPerOunce = packagePrice / packageSize;
    return recipeOunces * costPerOunce;
  }

  if (recipeUnit === 'tbsp') {
    const recipeOunces = quantity * (OUNCES_PER_CUP / TBSP_PER_CUP);
    const costPerOunce = packagePrice / packageSize;
    return recipeOunces * costPerOunce;
  }

  if (recipeUnit === 'tsp') {
    const recipeOunces = quantity * (OUNCES_PER_CUP / TSP_PER_CUP);
    const costPerOunce = packagePrice / packageSize;
    return recipeOunces * costPerOunce;
  }

  return null;
};

const getRecipeGrams = (
  quantity: number,
  recipeUnit: string,
  gramsPerCup?: number,
): number => {
  switch (recipeUnit) {
    case 'cup':
      if (gramsPerCup !== undefined) {
        return quantity * gramsPerCup;
      }
      break;

    case 'tbsp':
      if (gramsPerCup !== undefined) {
        return quantity * (gramsPerCup / TBSP_PER_CUP);
      }
      break;

    case 'tsp':
      if (gramsPerCup !== undefined) {
        return quantity * (gramsPerCup / TSP_PER_CUP);
      }
      break;

    case 'oz':
      return quantity * GRAMS_PER_OZ;

    case 'g':
      return quantity;

    default:
      return 0;
  }

  return 0;
};

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

  if (packageUnit === 'oz' && gramsPerCup === undefined) {
    const volumeCost = getVolumeCost(
      quantity,
      recipeUnit,
      packageSize,
      packagePrice,
    );

    if (volumeCost !== null) {
      return volumeCost;
    }
  }
  const totalPackageGrams = getTotalPackageGrams(packageSize, packageUnit);

  if (!totalPackageGrams) return 0;

  const recipeGrams = getRecipeGrams(quantity, recipeUnit, gramsPerCup);

  if (!recipeGrams) return 0;

  const costPerGram = packagePrice / totalPackageGrams;
  const ingredientCost = recipeGrams * costPerGram;

  return ingredientCost;
};
