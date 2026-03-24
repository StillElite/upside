import { ProductDetails } from './ProductDetails';
import { Product } from '../../types/products';
import { Header } from '../../components/Header';
import { ProductSidebar } from './ProductSidebar';

export interface ProductViewProps {
  selectedProduct: Product | null;
}

export const ProductView = ({ selectedProduct }: ProductViewProps) => {
  if (!selectedProduct) {
    return null;
  }
  return (
    <div className='flex flex-col h-full min-h-0'>
      <Header title={selectedProduct.name} />

      <div className='flex-1 grid gap-6 grid-cols-[minmax(0,900px)_420px] 2xl:grid-cols-[minmax(0,900px)_480px] p-8 bg-[#f3f5f2] overflow-hidden'>
        <ProductDetails selectedProduct={selectedProduct} />
        <ProductSidebar selectedProduct={selectedProduct} />
      </div>
    </div>
  );
};
