export const RECIPE_UNITS = ['cup', 'tbsp', 'tsp', 'oz', 'g', 'each'] as const;

export type RecipeUnit = (typeof RECIPE_UNITS)[number];

export const RECIPE_UNIT_OPTIONS = RECIPE_UNITS.map((unit) => ({
  value: unit,
  label: unit,
}));

export const PACKAGE_UNITS = ['lb', 'oz', 'each'] as const;

export type PackageUnit = (typeof PACKAGE_UNITS)[number];

export const PACKAGE_UNIT_OPTIONS = PACKAGE_UNITS.map((unit) => ({
  value: unit,
  label: unit,
}));
