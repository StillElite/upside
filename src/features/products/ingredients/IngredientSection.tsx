import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { IngredientItem } from '../../../types/products';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { addIngredient } from '../../../store/slices/productSlice';
import { IngredientForm } from './IngredientForm';
import { IngredientRow } from './IngredientList';

export interface IngredientListProps {
  ingredients: IngredientItem[];
}

type IngredientOption = {
  value: string;
  label: string;
};

export const IngredientList = ({ ingredients }: IngredientListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );

  const [newIngredientName, setNewIngredientName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');

  const [ingredientOptions, setIngredientOptions] = useState<
    IngredientOption[]
  >([
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]);

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
      if (!listRef.current) {
        return;
      }

      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const handleSaveNewIngredient = () => {
    if (!newIngredientName.trim() || !newQuantity.trim() || !newUnit.trim()) {
      return;
    }

    const newIngredient: IngredientItem = {
      id: crypto.randomUUID(),
      name: newIngredientName.trim(),
      quantity: Number(newQuantity),
      unit: newUnit.trim(),
      cost: 0,
    };

    handleAddIngredient(newIngredient);

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
            <Button
              text='Add Ingredient'
              className='text-xs'
              icon={isAddingIngredient ? faCaretDown : faCaretRight}
              iconPosition='right'
              onClick={handleToggleAddIngredient}
            />
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
        <div className='group flex items-center justify-between border-b border-[#c6c8d2] px-2 py-4 transition-colors hover:bg-[#E0E7EC]'>
          <IngredientForm
            ingredientName={newIngredientName}
            quantity={newQuantity}
            unit={newUnit}
            options={ingredientOptions}
            setOptions={setIngredientOptions}
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
        <IngredientRow ingredients={ingredients} />
      </div>
    </div>
  );
};
