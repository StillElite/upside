import { Product } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';

export interface CostSummaryProps {
  selectedProduct: Product;
}

export const CostSummary = ({ selectedProduct }: CostSummaryProps) => {
  // Calculate total from your dummy data
  const currentCost = selectedProduct.ingredients.reduce(
    (acc, ing) => acc + ing.cost,
    0,
  );

  // FAKE: Just for the "Finished Look" in the UI
  // Let's pretend the reference cost was 5% cheaper
  const referenceCost = currentCost * 0.95;
  const drift = currentCost - referenceCost;

  return (
    <ul className='space-y-3 text-[#1c2b3d]'>
      <li className='flex justify-between '>
        <span className='text-neutral-500'>Current Cost</span>
        <strong>{formatMoney(currentCost)}</strong>
      </li>
      <li className='flex justify-between '>
        <span className='text-neutral-500'>Sell Price</span>
        <strong>{formatMoney(selectedProduct.sellPrice)}</strong>
      </li>
      <li className='flex justify-between  '>
        <span className='font-bold'>Profit Now</span>
        <span className='text-[#315e88] font-bold text-lg'>
          {formatMoney(selectedProduct.sellPrice - currentCost)}
        </span>
      </li>
      <li className='h-[1px] bg-[#c6c8d2]/30 my-2' />
      <li className='flex justify-between '>
        <span className='text-neutral-500'>Reference Cost</span>
        <strong>{formatMoney(referenceCost)}</strong>
      </li>
      <li className='flex justify-between  '>
        <span className='font-bold'>Profit at Reference</span>
        <span className='text-[#315e88] font-bold text-lg'>
          {formatMoney(selectedProduct.sellPrice - referenceCost)}
        </span>
      </li>
      <li className='flex justify-between items-center bg-[#fff4e5] px-2 py-1 rounded-md -mx-2'>
        <span className='text-[#855d2b] text-xs font-semibold uppercase tracking-wider'>
          Cost Drift
        </span>
        <span className='text-[#855d2b] font-bold'>+{formatMoney(drift)}</span>
      </li>
    </ul>
  );
};
