import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProductView } from '../products/ProductView';
import { PantryView } from '../pantry/PantryView';
import { Product } from '../../types/products';
import { NewProductModal } from '../products/NewProductModal';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import {
  addProduct,
  setSelectedProductId,
} from '../../store/slices/productSlice';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeView, setActiveView] = useState<'product' | 'pantry'>('product');
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  const handleCreateProduct = (newProductData: {
    name: string;
    sellPrice: number;
  }) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: newProductData.name,
      sellPrice: newProductData.sellPrice,
      ingredients: [],
    };
    dispatch(addProduct(newProduct));

    dispatch(setSelectedProductId(newProduct.id));
  };

  return (
    <div className='h-dvh overflow-x-auto overflow-y-hidden bg-[#253a4b] p-6'>
      <div className='mx-auto flex h-full w-full max-w-[1500px] min-w-[1200px] overflow-hidden rounded-[32px]'>
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onAddProduct={() => setIsNewProductOpen(true)}
        />
        <NewProductModal
          isOpen={isNewProductOpen}
          onClose={() => setIsNewProductOpen(false)}
          onCreateProduct={handleCreateProduct}
        />
        <main
          className='flex-1'
          aria-label={activeView === 'pantry' ? 'Pantry view' : 'Product view'}
        >
          {activeView === 'pantry' ? <PantryView /> : <ProductView />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
