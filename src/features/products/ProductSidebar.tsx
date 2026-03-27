import { useState } from 'react';
import { Button } from '../../components/Button';
import { ConfirmModal } from '../../components/ConfirmModal';
import { PanelCard } from '../../components/PanelCard';
import { CostSummary } from './CostSummary';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  deleteProduct,
  setSelectedProductId,
} from '../../store/slices/productSlice';

export const ProductSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, selectedProductId } = useSelector(
    (state: RootState) => state.products,
  );

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) ?? null;

  if (!selectedProduct) return null;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const confirmMessage = (
    <>
      Are you sure you want to delete <strong>{selectedProduct.name}</strong>?
    </>
  );

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ productId: selectedProduct.id }));

    const remainingProducts = products.filter(
      (product) => product.id !== selectedProduct.id,
    );

    const nextSelectedId = remainingProducts[0]?.id ?? null;
    dispatch(setSelectedProductId(nextSelectedId));

    setIsConfirmOpen(false);
  };
  return (
    <div className='flex flex-col gap-2'>
      <PanelCard title='Cost & Profit'>
        <CostSummary selectedProduct={selectedProduct} />
      </PanelCard>

      <PanelCard title='Quick Action'>
        <Button
          text='Delete Recipe'
          variant='destructive'
          aria-label={`Delete ${selectedProduct.name}`}
          onClick={() => setIsConfirmOpen(true)}
        />
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteProduct}
          title='Delete Product'
          confirmLabel='Delete'
          message={confirmMessage}
        />
      </PanelCard>
    </div>
  );
};
