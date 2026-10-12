import { useDispatch } from 'react-redux';
import { EditableValue } from '../../components/EditableValue';
import { formatMoney } from '../../utils/formatMoney';
import { AppDispatch } from '../../store/store';
import {
  updateIndividualPrice,
  updatePortionCountPrice,
} from '../../store/slices/productSlice';

export interface IndividualPricingProps {
  selectedProductId: string | null;
  currentCost: number;
  portionCount?: number;
  individualPrice?: number;
}

export const IndividualPricing = ({
  selectedProductId,
  currentCost,
  portionCount,
  individualPrice,
}: IndividualPricingProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const potentialProfit =
    portionCount !== undefined && individualPrice !== undefined
      ? portionCount * individualPrice - currentCost
      : undefined;

  let potentialProfitDisplay: string | number = '';

  if (potentialProfit !== undefined && potentialProfit > 0) {
    potentialProfitDisplay = formatMoney(potentialProfit);
  }

  const handleSavePortionCount = (portionCount: number) => {
    if (!selectedProductId) return;

    dispatch(
      updatePortionCountPrice({
        productId: selectedProductId,
        newPortionCount: portionCount,
      }),
    );
  };

  const handleSaveIndividualPrice = (individualPrice: number) => {
    if (!selectedProductId) return;
    dispatch(
      updateIndividualPrice({
        productId: selectedProductId,
        newIndividualPrice: individualPrice,
      }),
    );
  };

  return (
    <div key={selectedProductId} className='space-y-3 text-[#1c2b3d]'>
      <EditableValue
        title='Portions'
        value={portionCount}
        onSave={handleSavePortionCount}
      />
      <EditableValue
        title='Price Per Portion'
        value={individualPrice}
        onSave={handleSaveIndividualPrice}
        isCurrency
      />
      <div className='h-[1px] bg-[#c6c8d2]/30 my-2' />
      <div className='flex justify-between'>
        <span className='text-neutral-500'>Potential Profit</span>
        <strong>{potentialProfitDisplay}</strong>
      </div>
    </div>
  );
};
