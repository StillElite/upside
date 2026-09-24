import { ProductDetails } from './ProductDetails';
import { Header } from '../../components/Header';
import { ProductSidebar } from './ProductSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { calculateIngredientCost } from '../../utils/calculateIngredientCost';

export const ProductView = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const pantryItems = useSelector(
    (state: RootState) => state.pantry.pantryItems,
  );

  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );

  const selectedProduct =
    selectedProductId === null
      ? null
      : products.find((products) => products.id === selectedProductId) || null;
  if (!selectedProduct) {
    return null;
  }

  const currentCost = selectedProduct.recipeIngredients.reduce(
    (total, recipeIngredient) => {
      const pantryItem = pantryItems.find(
        (item) => item.id === recipeIngredient.pantryItemId,
      );
      if (!pantryItem) return total;

      const ingredientCost = calculateIngredientCost(
        pantryItem.packageSize,
        pantryItem.packageUnit,
        pantryItem.packagePrice,
        pantryItem.gramsPerCup,
        recipeIngredient.quantity,
        recipeIngredient.recipeUnit,
      );

      return total + ingredientCost;
    },
    0,
  );

  return (
    <div className='flex flex-col h-full min-h-0'>
      <Header title={selectedProduct.name} />

      <div className='flex-1 grid gap-6 grid-cols-[minmax(0,900px)_420px] 2xl:grid-cols-[minmax(0,900px)_480px] p-8 bg-[#f3f5f2] overflow-hidden'>
        <ProductDetails
          selectedProduct={selectedProduct}
          currentCost={currentCost}
        />
        <ProductSidebar
          currentCost={currentCost}
          referenceCost={selectedProduct.referenceCost}
        />
      </div>
    </div>
  );
};
