import { ProductDetails } from './ProductDetails';
import { Product } from '../../types/products';
import { Header } from '../../components/Header';

export interface ProductViewProps {
  selectedProduct: Product;
}

export const ProductView = ({ selectedProduct }: ProductViewProps) => {
  return (
    <>
      <Header title={selectedProduct.name} />

      <div className='h-full w-full grid gap-6 lg:grid-cols-[minmax(0,900px)_420px] 2xl:grid-cols-[minmax(0,900px)_480px] p-8 bg-[#f3f5f2]'>
        <ProductDetails selectedProduct={selectedProduct} />
        <div className='block'>Product Sidebar</div>
      </div>
    </>
  );
};
