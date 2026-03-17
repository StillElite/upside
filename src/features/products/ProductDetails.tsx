import { Product } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';
import { IngredientList } from './IngredientList';

export interface ProductDetailsProps {
  selectedProduct: Product;
}

export const ProductDetails = ({ selectedProduct }: ProductDetailsProps) => {
  const sellPrice = formatMoney(selectedProduct.sellPrice);

  return (
    <div className='flex flex-col h-full min-h-0'>
      <div className='flex items-center shrink-0'>
        <label htmlFor='sell-price'>Sell price</label>
        <input
          id='sell-price'
          value={sellPrice}
          readOnly
          className='relative z-0 peer bg-white font-semibold ml-2 pl-2 border border-gray-300 rounded-md text-base text-[#1c2b3d] h-8 w-60'
        />
      </div>
      <IngredientList ingredients={selectedProduct.ingredients} />

      <footer className='shrink-0 pt-6 pb-2 mt-auto border-t border-[#c6c8d2]/40'>
        <p className='text-[#1c2b3d]/50 italic text-[13px] tracking-wide'>
          Prices are managed manually to ensure calculation accuracy.
        </p>
      </footer>
    </div>
  );
};
