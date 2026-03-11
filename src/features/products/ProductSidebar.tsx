import { Button } from '../../components/Button';
import { PanelCard } from '../../components/PanelCard';
import { Product } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';

export interface ProductSidebarProps {
  selectedProduct: Product;
}

export const ProductSidebar = ({ selectedProduct }: ProductSidebarProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <PanelCard title='Cost & Profit'>Cost Summary</PanelCard>

      <PanelCard title='Quick Actions'>
        <div className='flex gap-2'>
          <Button text={'Edit Price'} className='w-full' />
          <Button text={'Reset Reference'} className='w-full' />
        </div>
      </PanelCard>
    </div>
  );
};
