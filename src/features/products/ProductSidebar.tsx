import { Button } from '../../components/Button';
import { PanelCard } from '../../components/PanelCard';
import { Product } from '../../types/products';
import { CostSummary } from './CostSummary';

export interface ProductSidebarProps {
  selectedProduct: Product;
}

export const ProductSidebar = ({ selectedProduct }: ProductSidebarProps) => {
  const ingredients = selectedProduct.ingredients;

  return (
    <div className='flex flex-col gap-2'>
      <PanelCard title='Cost & Profit'>
        <CostSummary selectedProduct={selectedProduct} />
      </PanelCard>

      <PanelCard title='Quick Actions'>
        <div className='flex gap-2'>
          <Button text={'Edit Price'} className='w-full' />
          <Button text={'Reset Reference'} className='w-full' />
        </div>
      </PanelCard>
    </div>
  );
};
