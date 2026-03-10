import { Header } from '../../components/Header';
import { Product } from '../../types/products';
import { ProductDetails } from './ProductDetails';

export interface ProductViewProps {
  selectedProduct: Product;
}

export const ProductView = ({ selectedProduct }: ProductViewProps) => {
  return (
    <>
      <Header title={selectedProduct.name} />
      <div className='w-full grid gap-6 lg:grid-cols-[minmax(0,900px)_420px] 2xl:grid-cols-[minmax(0,900px)_480px] items-start p-8'>
        <ProductDetails selectedProduct={selectedProduct} />
        <div className='block'>Product Sidebar</div>
      </div>
    </>
  );
};
