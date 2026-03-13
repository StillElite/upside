import { Button } from '../../components/Button';
import { PanelCard } from '../../components/PanelCard';
import { Product } from '../../types/products';
import { CostSummary } from './CostSummary';

export interface ProductSidebarProps {
  selectedProduct: Product;
}

export const ProductSidebar = ({ selectedProduct }: ProductSidebarProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <PanelCard title='Cost & Profit'>
        <CostSummary selectedProduct={selectedProduct} />
      </PanelCard>

      <PanelCard title='Quick Actions'>
        <Button text='Delete Recipe' variant='destructive' />
      </PanelCard>
    </div>
  );
};
