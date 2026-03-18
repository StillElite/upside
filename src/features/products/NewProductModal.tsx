import { useState } from 'react';
import { FormModal } from '../../components/FormModal';
import { FormField } from '../../components/FormField';

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

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a name.';
    }

    if (!sellPrice.trim()) {
      newErrors.sellPrice = 'Please enter a price.';
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
          label='Price'
          type='number'
          prefix='$'
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
