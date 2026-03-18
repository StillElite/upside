import { useState } from 'react';
import { FormModal } from '../../components/FormModal';
import CreatableSelect from 'react-select/creatable';

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddIngredientModal = ({
  isOpen,
  onClose,
}: AddIngredientModalProps) => {
  const [ingredient, setIngredient] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const handleSubmit = () => {
    if (!ingredient) return;

    console.log({ ingredient });
  };

  const creatableSelectStyles = {
    control: (base: any, state: { isFocused: boolean }) => ({
      ...base,
      borderColor: state.isFocused ? '#305e88' : base.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #305e88' : base.boxShadow,
      '&:hover': {
        borderColor: '#305e88',
      },
    }),
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

        <CreatableSelect
          inputId='ingredient-name'
          value={ingredient}
          onChange={(newValue) =>
            setIngredient(newValue as { label: string; value: string } | null)
          }
          placeholder='Select or create ingredient...'
          isClearable
          classNamePrefix='react-select'
          styles={creatableSelectStyles}
        />
      </div>
    </FormModal>
  );
};
