import { Product } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';
import { IngredientList } from './IngredientList';

export interface ProductDetailsProps {
  selectedProduct: Product;
}

export const ProductDetails = ({ selectedProduct }: ProductDetailsProps) => {
  const sellPrice = formatMoney(selectedProduct.sellPrice);
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <span>Sell Price:</span>
        <input
          id='sell-price'
          value={sellPrice}
          // onChange={}
          className='relative z-0 peer bg-white font-semibold ml-2 pl-2 border border-gray-300 rounded-md text-base text-[#1c2b3d] placeholder-transparent shadow-sm focus:outline-none focus:border-[#315e88] focus-visible:ring-2 focus-visible:ring-[#315e88] appearance-none flex items-center h-8 w-60'
        />
      </div>
      <IngredientList ingredients={selectedProduct.ingredients} />
    </div>
  );
};
