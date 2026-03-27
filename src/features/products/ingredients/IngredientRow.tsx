import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { formatMoney } from '../../../utils/formatMoney';
import { IngredientForm } from './IngredientForm';
import { IngredientItem } from '../../../types/products';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  deleteIngredient,
  editIngredient,
} from '../../../store/slices/productSlice';
import { ConfirmModal } from '../../../components/ConfirmModal';

export interface IngredientRowProps {
  ingredients: IngredientItem[];
}

export const IngredientRow = ({ ingredients }: IngredientRowProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] =
    useState<IngredientItem | null>(null);

  const [editingIngredientId, setEditingIngredientId] = useState<string | null>(
    null,
  );
  const [editIngredientName, setEditIngredientName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editUnit, setEditUnit] = useState('');

  const isEditIngredientValid =
    editIngredientName.trim() !== '' &&
    editQuantity.trim() !== '' &&
    editUnit.trim() !== '';

  const handleSaveEdit = () => {
    if (!selectedProductId || !editingIngredientId) {
      return;
    }

    if (!isEditIngredientValid) {
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

  const handleStartEdit = (ingredient: IngredientItem) => {
    setEditingIngredientId(ingredient.id);
    setEditIngredientName(ingredient.name);
    setEditQuantity(ingredient.quantity.toString());
    setEditUnit(ingredient.unit);
  };

  const handleCancelIngredientForm = () => {
    setEditingIngredientId(null);
    setEditIngredientName('');
    setEditQuantity('');
    setEditUnit('');
  };

  const handleDeleteIngredient = () => {
    if (!ingredientToDelete || !selectedProductId) return;

    const deletedIngredient = {
      productId: selectedProductId,
      ingredientId: ingredientToDelete.id,
    };

    dispatch(deleteIngredient(deletedIngredient));

    setIsConfirmOpen(false);
    setIngredientToDelete(null);
  };

  const confirmMessage = (
    <>
      Are you sure you want to delete{' '}
      <strong>{ingredientToDelete?.name}</strong>?
    </>
  );
  return (
    <>
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

                    <div className='ebo flex items-center gap-3 group-focus-within:opacity-100 transition-opacity'>
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
                        onClick={() => {
                          setIngredientToDelete(ingredient);
                          setIsConfirmOpen(true);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteIngredient}
        title='Delete Ingredient'
        confirmLabel='Delete'
        message={confirmMessage}
      />
    </>
  );
};
