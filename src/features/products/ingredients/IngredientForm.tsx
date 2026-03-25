import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';

export interface IngredientFormProps {
  ingredientName: string;
  quantity: string;
  unit: string;
  onIngredientNameChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}

export const IngredientForm = ({
  ingredientName,
  quantity,
  unit,
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

  return (
    <>
      <div className='flex flex-1 items-center gap-3'>
        <input
          id='ingredient-name'
          type='text'
          placeholder='Name'
          value={ingredientName}
          onChange={(e) => onIngredientNameChange(e.target.value)}
          className='min-w-[140px] rounded-md border border-[#c6c8d2] px-2 py-1 text-sm'
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
          type='button'
          icon={faPlus}
          variant='icon-only'
          className={addButtonClasses}
          aria-label='Save ingredient'
          disabled={!isValid}
          onClick={onSave}
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
    </>
  );
};
