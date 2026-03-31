import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { IngredientItem } from '../../../types/products';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { addIngredient } from '../../../store/slices/productSlice';
import { IngredientForm } from './IngredientForm';
import { IngredientList } from './IngredientList';
import toast from 'react-hot-toast';

export interface IngredientSectionProps {
  ingredients: IngredientItem[];
}

export type IngredientOption = {
  value: string;
  label: string;
};

export const IngredientSection = ({ ingredients }: IngredientSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const [isEditingIngredient, setIsEditingIngredient] = useState(false);
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');

  const pantryItems = useSelector(
    (state: RootState) => state.pantry.pantryItems,
  );

  const ingredientOptions: IngredientOption[] = pantryItems.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const isNewIngredientValid =
    newIngredientName.trim() !== '' &&
    newQuantity.trim() !== '' &&
    newUnit.trim() !== '';

  const handleAddIngredient = (ingredient: IngredientItem) => {
    if (!selectedProductId) return;

    dispatch(
      addIngredient({
        productId: selectedProductId,
        newIngredient: ingredient,
      }),
    );

    requestAnimationFrame(() => {
      if (!listRef.current) return;

      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const handleSaveNewIngredient = () => {
    if (!isNewIngredientValid) return;

    const newIngredient: IngredientItem = {
      id: crypto.randomUUID(),
      name: newIngredientName.trim(),
      quantity: Number(newQuantity),
      unit: newUnit.trim(),
      cost: 0,
    };

    handleAddIngredient(newIngredient);
    toast.success(`${newIngredient.name} added successfully`);

    setNewIngredientName('');
    setNewQuantity('');
    setNewUnit('');
    setIsAddingIngredient(false);
  };

  const handleToggleAddIngredient = () => {
    setIsAddingIngredient((prev) => !prev);
    setNewIngredientName('');
    setNewQuantity('');
    setNewUnit('');
  };

  useEffect(() => {
    if (isAddingIngredient) {
      setIsAddingIngredient(false);
    }
  }, [selectedProductId]);

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <div className='shrink-0 border-b border-[#c6c8d2] pb-2 pt-8'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-[#1c2b3d]'>Ingredients</h2>

          <div className='flex gap-2'>
            <div className='relative group'>
              <Button
                text='Add Ingredient'
                className='text-xs'
                icon={isAddingIngredient ? faCaretDown : faCaretRight}
                iconPosition='right'
                onClick={handleToggleAddIngredient}
                disabled={isEditingIngredient}
              />
              {isEditingIngredient && (
                <span
                  className={`absolute right-0 bottom-full w-max whitespace-normal rounded bg-slate-800 text-white px-2 py-1 text-xs  opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-10 shadow-lg`}
                >
                  Complete or cancel the current form
                </span>
              )}
            </div>

            <Button
              text='Set Reference'
              className='text-xs'
              variant='secondary'
              icon={faCaretRight}
              iconPosition='right'
            />
          </div>
        </div>
      </div>

      {isAddingIngredient && (
        <div className='border-b border-[#c6c8d2] px-2 py-4 transition-colors hover:bg-[#E0E7EC]'>
          <IngredientForm
            ingredientName={newIngredientName}
            quantity={newQuantity}
            unit={newUnit}
            options={ingredientOptions}
            onIngredientNameChange={setNewIngredientName}
            onQuantityChange={setNewQuantity}
            onUnitChange={setNewUnit}
            onSave={handleSaveNewIngredient}
            onCancel={handleToggleAddIngredient}
            isValid={isNewIngredientValid}
          />
        </div>
      )}

      <div
        ref={listRef}
        className='custom-scrollbar min-h-0 flex-1 overflow-y-auto'
      >
        <IngredientList
          ingredients={ingredients}
          ingredientOptions={ingredientOptions}
          isAddingIngredient={isAddingIngredient}
          onEditingChange={setIsEditingIngredient}
        />
      </div>
    </div>
  );
};
