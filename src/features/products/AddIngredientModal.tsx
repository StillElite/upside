import { useState } from 'react';
import { FormModal } from '../../components/FormModal';

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddIngredientModal = ({
  isOpen,
  onClose,
}: AddIngredientModalProps) => {
  const [ingredientName, setIngredientName] = useState('');

  const handleSubmit = () => {
    console.log({ ingredientName });
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title='Add Ingredient'
      cancelLabel='Cancel'
      submitLabel='Save Ingredient'
    >
      <div className='space-y-1'>
        <label
          htmlFor='ingredient-name'
          className='block text-sm font-medium text-[#38506a]'
        >
          Ingredient
        </label>

        <div id='ingredient-name'>Creatable select goes here</div>
      </div>
    </FormModal>
  );
};
