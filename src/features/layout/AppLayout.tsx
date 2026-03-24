import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProductView } from '../products/ProductView';
import { PantryView } from '../pantry/PantryView';
import { IngredientItem, Product } from '../../types/products';
import { NewProductModal } from '../products/NewProductModal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import {
  addProduct,
  setSelectedProductId,
} from '../../store/slices/productSlice';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );
  const [activeView, setActiveView] = useState<'product' | 'pantry'>('product');
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  const selectedProduct =
    selectedProductId === null
      ? null
      : products.find((product) => product.id === selectedProductId) || null;

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
          products={products}
          selectedProductId={selectedProductId}
          activeView={activeView}
          setSelectedProductId={(productId) =>
            dispatch(setSelectedProductId(productId))
          }
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
          {activeView === 'pantry' ? (
            <PantryView />
          ) : (
            <ProductView selectedProduct={selectedProduct} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
