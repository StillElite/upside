import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import CreatableSelect from 'react-select/creatable';
import type { SingleValue } from 'react-select';

export interface IngredientFormProps {
  ingredientName: string;
  quantity: string;
  unit: string;
  options: IngredientOption[];
  setOptions: React.Dispatch<React.SetStateAction<IngredientOption[]>>;
  onIngredientNameChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}

type IngredientOption = {
  value: string;
  label: string;
};

export const IngredientForm = ({
  ingredientName,
  quantity,
  unit,
  options,
  setOptions,
  onIngredientNameChange,
  onQuantityChange,
  onUnitChange,
  onSave,
  onCancel,
  isValid,
}: IngredientFormProps) => {
  const addButtonClasses = isValid
    ? 'w-6 h-6 rounded-full bg-[#305e88] text-white hover:bg-[#274f72]'
    : 'w-6 h-6 rounded-full bg-slate-200 text-slate-400';

  const selectedOption = ingredientName
    ? {
        value: ingredientName,
        label: ingredientName,
      }
    : null;

  const createOption = (label: string): IngredientOption => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });
  const handleCreate = (inputValue: any) => {
    const newOption = createOption(inputValue);

    setOptions((prevOptions) => [...prevOptions, newOption]);

    onIngredientNameChange(newOption.label);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) return;
        onSave();
      }}
      className='flex w-full items-center justify-between'
    >
      <div className='flex flex-1 items-center gap-3'>
        <CreatableSelect
          isClearable
          onChange={(newValue: SingleValue<IngredientOption>) =>
            onIngredientNameChange(newValue?.label ?? '')
          }
          onCreateOption={handleCreate}
          options={options}
          value={selectedOption}
          className='min-w-[140px] rounded-md px-2 py-1 text-sm'
        />
        <span>-</span>

        <input
          id='ingredient-quantity'
          type='number'
          placeholder='Qty'
          value={quantity}
          onChange={(e) => onQuantityChange(e.target.value)}
          min={1}
          className='w-20 rounded-md border border-[#c6c8d2] px-2 py-1 text-sm'
        />

        <input
          id='ingredient-unit'
          type='text'
          placeholder='Unit'
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className='w-24 rounded-md border border-[#c6c8d2] px-2 py-1 text-sm'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Button
          type='submit'
          icon={faPlus}
          variant='icon-only'
          className={addButtonClasses}
          aria-label='Save ingredient'
          disabled={!isValid}
        />

        <Button
          type='button'
          icon={faTimes}
          variant='icon-only'
          className='w-6 h-6 rounded-full bg-slate-300 text-slate-800 hover:bg-slate-400'
          aria-label='Cancel'
          onClick={onCancel}
        />
      </div>
    </form>
  );
};
