import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProductView } from '../products/ProductView';
import { PantryView } from '../pantry/PantryView';
import { products } from '../../data/mockData';

const AppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState<'product' | 'pantry'>('product');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    products[0].id,
  );

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) ?? products[0];

  return (
    <div className='min-h-dvh flex bg-[#f3f5f2]'>
      <Sidebar
        products={products}
        selectedProductId={selectedProductId}
        activeView={activeView}
        setSelectedProductId={setSelectedProductId}
        setActiveView={setActiveView}
      />

      <main className='flex-1'>
        {activeView === 'pantry' ? (
          <PantryView />
        ) : (
          <ProductView selectedProduct={selectedProduct} />
        )}
      </main>
    </div>
  );
};

export default AppLayout;
