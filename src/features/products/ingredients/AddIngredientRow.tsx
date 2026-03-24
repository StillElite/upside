import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { IngredientItem } from '../../../types/products';
import { useState } from 'react';

export interface AddIngredientRowProps {
  onAddIngredient: (ingredient: IngredientItem) => void;
  onCancel: () => void;
}

export const AddIngredientRow = ({
  onAddIngredient,
  onCancel,
}: AddIngredientRowProps) => {
  const [ingredientName, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const isValid =
    ingredientName.trim() !== '' &&
    quantity.trim() !== '' &&
    unit.trim() !== '';

  const inputClasses =
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#305e88] focus:ring-1 focus:ring-[#305e88]';

  const addButtonClasses = isValid
    ? 'w-6 h-6 rounded-full bg-[#305e88] text-white hover:bg-[#274f72]'
    : 'w-6 h-6 rounded-full bg-slate-200 text-slate-400';

  const handleSaveIngredient = () => {
    if (!ingredientName.trim() || !quantity.trim() || !unit.trim()) {
      return;
    }

    const newIngredient: IngredientItem = {
      id: crypto.randomUUID(),
      name: ingredientName.trim(),
      quantity: Number(quantity),
      unit: unit.trim(),
      cost: 0,
    };

    onAddIngredient(newIngredient);

    setIngredientName('');
    setQuantity('');
    setUnit('');
  };

  return (
    <div className='mt-3 rounded-md border border-slate-200 bg-slate-50 p-3'>
      <div className='grid grid-cols-[minmax(0,2fr)_120px_120px_auto] gap-3'>
        <input
          id='ingredient-name'
          type='text'
          placeholder='Name'
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          className={inputClasses}
        />
        <input
          id='ingredient-quantity'
          type='number'
          placeholder='Qty'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={1}
          className={inputClasses}
        />

        <input
          id='ingredient-unit'
          type='text'
          placeholder='Unit'
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className={inputClasses}
        />
        <div className='flex items-center justify-end gap-3 pl-2'>
          <Button
            type='button'
            icon={faPlus}
            variant='icon-only'
            className={addButtonClasses}
            aria-label='Save ingredient'
            disabled={!isValid}
            onClick={handleSaveIngredient}
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
      </div>
    </div>
  );
};
