import { ProductDetails } from './ProductDetails';
import { Header } from '../../components/Header';
import { ProductSidebar } from './ProductSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const ProductView = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );

  const selectedProduct =
    selectedProductId === null
      ? null
      : products.find((products) => products.id === selectedProductId) || null;
  if (!selectedProduct) {
    return null;
  }
  return (
    <div className='flex flex-col h-full min-h-0'>
      <Header title={selectedProduct.name} />

      <div className='flex-1 grid gap-6 grid-cols-[minmax(0,900px)_420px] 2xl:grid-cols-[minmax(0,900px)_480px] p-8 bg-[#f3f5f2] overflow-hidden'>
        <ProductDetails selectedProduct={selectedProduct} />
        <ProductSidebar />
      </div>
    </div>
  );
};
