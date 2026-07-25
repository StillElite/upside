import { Product } from '../types/products';

export const hasDuplicateProductName = (
  existingProducts: Product[],
  proposedName: string,
) => {
  return existingProducts.some((product) => {
    return (
      product.name.trim().toLowerCase() === proposedName.trim().toLowerCase()
    );
  });
};
