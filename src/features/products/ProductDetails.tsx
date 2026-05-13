import { useState } from 'react';
import { Product } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';
import { IngredientSection } from './ingredients/IngredientSection';
import { faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { updateProductSellPrice } from '../../store/slices/productSlice';
import toast from 'react-hot-toast';

export interface ProductDetailsProps {
  selectedProduct: Product;
}

export const ProductDetails = ({ selectedProduct }: ProductDetailsProps) => {
  const [sellPriceInput, setSellPriceInput] = useState<string>(
    selectedProduct.sellPrice.toString(),
  );
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const [isEditingFlow, setIsEditingFlow] = useState(false);
  const [isEditingSellPrice, setIsEditingSellPrice] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );

  const sellPrice = selectedProduct.sellPrice.toFixed(2);
  const isSellPriceValid = sellPriceInput.trim() !== '';

  const updatePriceButtonClasses = isSellPriceValid
    ? 'w-6 h-6 rounded-full bg-[#305e88] text-white hover:bg-[#274f72]'
    : 'w-6 h-6 rounded-full bg-slate-200 text-slate-400';

  const handleSubmit = () => {
    if (!selectedProductId) return;

    setIsEditingSellPrice(false);
    setSellPriceInput(sellPriceInput);

    dispatch(
      updateProductSellPrice({
        productId: selectedProductId,
        newSellPrice: Number(sellPriceInput),
      }),
    );
    toast.success(`${selectedProduct.name} price updated successfully`);
  };

  const handleClose = () => {
    setIsEditingSellPrice((prev) => !prev);
    setSellPriceInput(sellPrice.toString());
  };

  return (
    <div className='flex flex-col h-full min-h-0'>
      <div className='flex items-center shrink-0'>
        {isEditingSellPrice ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className='flex items-center gap-2'
          >
            <div className='flex relative items-center'>
              <label htmlFor='sell-price' className='font-semibold mr-1'>
                Sell Price:
              </label>
              <span className='absolute left-[78px] z-40'>$</span>
              <input
                id='sell-price'
                type='number'
                value={sellPriceInput}
                onChange={(e) => {
                  setSellPriceInput(e.target.value);
                }}
                className='relative z-0 peer pb-[2px] bg-white pl-3 border border-gray-300 rounded-md text-base text-[#1c2b3d] h-8 w-60'
              />
            </div>

            <Button
              type='submit'
              icon={faPlus}
              variant='icon-only'
              className={updatePriceButtonClasses}
              aria-label='Save ingredient'
              disabled={!isSellPriceValid}
            />

            <Button
              type='button'
              icon={faTimes}
              variant='icon-only'
              className='w-6 h-6 rounded-full bg-slate-300 text-slate-800 hover:bg-slate-400'
              aria-label='Cancel'
              onClick={() => setIsEditingSellPrice((prev) => !prev)}
            />
          </form>
        ) : (
          <div className='flex items-center gap-2 h-[32px] relative'>
            <p>
              <span className='font-semibold mr-1'>Sell Price:</span>{' '}
              {formatMoney(selectedProduct.sellPrice)}
            </p>
            <div className='relative group'>
              <Button
                icon={faPen}
                variant='icon-only'
                className='text-gray-400 hover:text-[#305e88]'
                aria-label={`Edit Price`}
                onClick={() => handleClose()}
                disabled={isAddingIngredient || isEditingFlow}
              />
              {(isAddingIngredient || isEditingFlow) && (
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full w-max whitespace-normal rounded bg-slate-800 text-white px-2 py-1 text-xs  opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-10 shadow-lg`}
                >
                  Complete or cancel the current form
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <IngredientSection
        recipeIngredients={selectedProduct.recipeIngredients}
        isAddingIngredient={isAddingIngredient}
        isEditingFlow={isEditingFlow}
        isEditingSellPrice={isEditingSellPrice}
        setIsAddingIngredient={setIsAddingIngredient}
        setIsEditingFlow={setIsEditingFlow}
      />

      <footer className='shrink-0 pt-6 pb-2 mt-auto border-t border-[#c6c8d2]/40'>
        <p className='text-[#1c2b3d]/50 italic text-[13px] tracking-wide'>
          Prices are managed manually to ensure calculation accuracy.
        </p>
      </footer>
    </div>
  );
};
