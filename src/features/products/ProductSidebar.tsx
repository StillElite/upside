import { PanelCard } from '../../components/PanelCard';
import { CostSummary } from './CostSummary';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface ProductSidebarProps {
  currentCost: number;
  referenceCost?: number;
}

export const ProductSidebar = ({
  currentCost,
  referenceCost,
}: ProductSidebarProps) => {
  const { products, selectedProductId } = useSelector(
    (state: RootState) => state.products,
  );

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) ?? null;

  if (!selectedProduct) return null;

  return (
    <div className='flex flex-col gap-2'>
      <PanelCard title='Cost & Profit'>
        <CostSummary
          selectedProduct={selectedProduct}
          currentCost={currentCost}
          referenceCost={referenceCost}
        />
      </PanelCard>

      <PanelCard title='By the Slice'>
        <p>hi</p>
      </PanelCard>
    </div>
  );
};
