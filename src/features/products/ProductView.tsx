import { Header } from '../../components/Header';
import { Product } from '../../types/products';

export interface ProductViewProps {
  selectedProduct: Product;
}

export const ProductView = ({ selectedProduct }: ProductViewProps) => {
  return <Header text={selectedProduct.name} />;
};
