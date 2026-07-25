import { useState } from 'react';
import { FormModal } from '../../components/FormModal';
import { FormField } from '../../components/FormField';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { hasDuplicateProductName } from '../../utils/hasDuplicateProductName';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProduct: (product: { name: string; sellPrice: number }) => void;
}

export const NewProductModal = ({
  isOpen,
  onClose,
  onCreateProduct,
}: NewProductModalProps) => {
  const [name, setName] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { products } = useSelector((state: RootState) => state.products);

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    const isDuplicateProductName = hasDuplicateProductName(products, name);

    if (isDuplicateProductName) {
      newErrors.name = 'A product with that name already exists.';
    }

    if (!name.trim()) {
      newErrors.name = 'Please enter a name.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreateProduct({ name: name.trim(), sellPrice: Number(sellPrice) });

    setName('');
    setSellPrice('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName('');
    setSellPrice('');
    setErrors({});
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title='New Product'
      cancelLabel='Cancel'
      submitLabel='Save Product'
      onSubmit={handleSubmit}
    >
      <div className='space-y-4'>
        <FormField
          id='product-name'
          label='Name'
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
        />

        <FormField
          id='product-price'
          label='Price (optional)'
          type='number'
          prefix='$'
          min={0}
          value={sellPrice}
          onChange={(value) => {
            setSellPrice(value);
            setErrors((prev) => ({ ...prev, sellPrice: '' }));
          }}
          error={errors.sellPrice}
        />
      </div>
    </FormModal>
  );
};
