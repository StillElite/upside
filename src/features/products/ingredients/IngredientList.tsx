import {
  faCaretRight,
  faPen,
  faCaretDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { IngredientItem } from '../../../types/products';
import { formatMoney } from '../../../utils/formatMoney';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  addIngredient,
  editIngredient,
} from '../../../store/slices/productSlice';
import { IngredientForm } from './IngredientForm';

export interface IngredientListProps {
  ingredients: IngredientItem[];
}

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

  const [editingIngredientId, setEditingIngredientId] = useState<string | null>(
    null,
  );
  const [editIngredientName, setEditIngredientName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editUnit, setEditUnit] = useState('');

  const isNewIngredientValid =
    newIngredientName.trim() !== '' &&
    newQuantity.trim() !== '' &&
    newUnit.trim() !== '';

  const isEditIngredientValid =
    editIngredientName.trim() !== '' &&
    editQuantity.trim() !== '' &&
    editUnit.trim() !== '';

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

  const handleStartEdit = (ingredient: IngredientItem) => {
    setEditingIngredientId(ingredient.id);
    setEditIngredientName(ingredient.name);
    setEditQuantity(ingredient.quantity.toString());
    setEditUnit(ingredient.unit);
  };

  const handleCancelIngredientForm = () => {
    setIsAddingIngredient(false);
    setNewIngredientName('');
    setNewQuantity('');
    setNewUnit('');

    setEditingIngredientId(null);
    setEditIngredientName('');
    setEditQuantity('');
    setEditUnit('');
  };

  const handleSaveEdit = () => {
    if (!selectedProductId || !editingIngredientId) {
      return;
    }

    if (
      !editIngredientName.trim() ||
      !editQuantity.trim() ||
      !editUnit.trim()
    ) {
      return;
    }

    const updatedIngredient: IngredientItem = {
      id: editingIngredientId,
      name: editIngredientName.trim(),
      quantity: Number(editQuantity),
      unit: editUnit.trim(),
      cost: 0,
    };

    dispatch(
      editIngredient({
        productId: selectedProductId,
        updatedIngredient,
      }),
    );

    handleCancelIngredientForm();
  };

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
              onClick={() => setIsAddingIngredient((prev) => !prev)}
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
            onIngredientNameChange={setNewIngredientName}
            onQuantityChange={setNewQuantity}
            onUnitChange={setNewUnit}
            onSave={handleSaveNewIngredient}
            onCancel={handleCancelIngredientForm}
            isValid={isNewIngredientValid}
          />
        </div>
      )}

      <div
        ref={listRef}
        className='custom-scrollbar min-h-0 flex-1 overflow-y-auto'
      >
        <ul className='text-[#1c2b3d]'>
          {ingredients.map((ingredient, index) => {
            const { id, name, quantity, unit, cost } = ingredient;
            const quantityDisplay = `${quantity} ${unit}`;
            const numberDisplay = index + 1;
            const isEditing = editingIngredientId === id;

            return (
              <li key={id}>
                <div className='group flex items-center justify-between border-b border-[#c6c8d2] px-2 py-4 transition-colors hover:bg-[#E0E7EC]'>
                  {isEditing ? (
                    <IngredientForm
                      ingredientName={editIngredientName}
                      quantity={editQuantity}
                      unit={editUnit}
                      onIngredientNameChange={setEditIngredientName}
                      onQuantityChange={setEditQuantity}
                      onUnitChange={setEditUnit}
                      onSave={handleSaveEdit}
                      onCancel={handleCancelIngredientForm}
                      isValid={isEditIngredientValid}
                    />
                  ) : (
                    <>
                      <div className='flex items-center gap-3'>
                        <span className='flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#315e88] text-white text-[14px] font-semibold'>
                          {numberDisplay}
                        </span>
                        <strong>{name}</strong>
                        <span>-</span>
                        <span>{quantityDisplay}</span>
                        <span>-</span>
                        <strong>{formatMoney(cost)}</strong>
                      </div>

                      <div className='flex items-center gap-3 group-focus-within:opacity-100 transition-opacity'>
                        <Button
                          icon={faPen}
                          variant='icon-only'
                          className='text-gray-400 hover:text-[#305e88]'
                          aria-label={`Edit ${name}`}
                          onClick={() => handleStartEdit(ingredient)}
                        />
                        <Button
                          icon={faTrash}
                          variant='icon-only'
                          className='text-gray-400 hover:text-[#ba3d3d]'
                          aria-label={`Delete ${name}`}
                        />
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
