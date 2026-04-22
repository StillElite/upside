import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import type { SingleValue } from 'react-select';
import { IngredientOption } from './IngredientSection';
import { RECIPE_UNIT_OPTIONS } from '../../../constants/unit';

export interface IngredientFormProps {
  ingredientName: string;
  quantity: string;
  recipeUnit: string;
  options: IngredientOption[];
  onIngredientNameChange: (value: string) => void;
  onIngredientOptionChange: (option: IngredientOption | null) => void;
  onQuantityChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}

export const IngredientForm = ({
  ingredientName,
  quantity,
  recipeUnit,
  options,
  onIngredientNameChange,
  onIngredientOptionChange,
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

  const handleCreate = (inputValue: string) => {
    const newOption: IngredientOption = {
      value: inputValue,
      label: inputValue,
      isNew: true,
    };
    onIngredientOptionChange(newOption);
    onIngredientNameChange(inputValue);
  };

  // const unitOptions = RECIPE_UNITS.map((unit) => ({
  //   value: unit,
  //   label: unit,
  // }));

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
          onChange={(newValue: SingleValue<IngredientOption>) => {
            onIngredientOptionChange(newValue ?? null);
            onIngredientNameChange(newValue?.label ?? '');
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? '#305e88' : base.borderColor,
              boxShadow: state.isFocused ? '0 0 0 2px #305e88' : base.boxShadow,
              '&:hover': {
                borderColor: state.isFocused ? '#305e88' : base.borderColor,
              },
            }),
          }}
          onCreateOption={handleCreate}
          options={options}
          value={selectedOption}
          placeholder='Select ingredient'
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
          className='h-[38px] w-28 rounded-[4px] border border-[#c6c8d2] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#305e88] focus:border-[#305e88]'
        />
        <Select
          options={RECIPE_UNIT_OPTIONS}
          value={
            RECIPE_UNIT_OPTIONS.find((opt) => opt.value === recipeUnit) || null
          }
          onChange={(option) => onUnitChange(option?.value ?? '')}
          isClearable
          placeholder='Select unit'
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? '#305e88' : base.borderColor,
              boxShadow: state.isFocused ? '0 0 0 2px #305e88' : base.boxShadow,
              '&:hover': {
                borderColor: state.isFocused ? '#305e88' : base.borderColor,
              },
            }),
          }}
          className='min-w-[140px] rounded-md px-2 py-1 text-sm'
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
