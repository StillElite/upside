import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProductView } from '../products/ProductView';
import { PantryView } from '../pantry/PantryView';
import { products as initialProducts } from '../../data/mockData';
import { IngredientItem, Product } from '../../types/products';
import { NewProductModal } from '../products/NewProductModal';

const AppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState<'product' | 'pantry'>('product');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    initialProducts[0].id,
  );
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) ?? products[0];

  // const handleAddProduct = (newProductData: {
  //   id: string;
  //   name: string;
  //   sellPrice: number;
  //   ingredients: IngredientItem[];
  // }) => {
  //   const newProduct: Product = {
  //     id: crypto.randomUUID(),
  //     name: newProductData.name,
  //     sellPrice: newProductData.sellPrice,
  //     ingredients: newProductData.ingredients,
  //   };
  // };

  return (
    <div className='h-dvh overflow-x-auto overflow-y-hidden bg-[#253a4b] p-6'>
      <div className='mx-auto flex h-full w-full max-w-[1500px] min-w-[1200px] overflow-hidden rounded-[32px]'>
        <Sidebar
          products={products}
          selectedProductId={selectedProductId}
          activeView={activeView}
          setSelectedProductId={setSelectedProductId}
          setActiveView={setActiveView}
          onAddProduct={() => setIsNewProductOpen(true)}
        />
        <NewProductModal
          isOpen={isNewProductOpen}
          onClose={() => setIsNewProductOpen(false)}
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
