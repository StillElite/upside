import { useState } from 'react';
import { FormModal } from '../../components/FormModal';
import { FormField } from '../../components/FormField';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProductModal = ({ isOpen, onClose }: NewProductModalProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError('Please enter a product name');
      return;
    }

    setNameError('');
    setName('');
    setPrice('');
    onClose();
    console.log({ name, price });
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
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
            if (nameError) {
              setNameError('');
            }
          }}
          error={nameError}
          maxLength={50}
        />

        <FormField
          id='product-price'
          label='Price'
          type='number'
          value={price}
          onChange={setPrice}
        />
      </div>
    </FormModal>
  );
};
