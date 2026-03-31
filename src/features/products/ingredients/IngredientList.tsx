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
import type { IngredientOption } from './IngredientSection';
import toast from 'react-hot-toast';

export interface IngredientListProps {
  ingredients: IngredientItem[];
  ingredientOptions: IngredientOption[];
  isAddingIngredient: boolean;
  onEditingChange: (isEditing: boolean) => void;
}

export const IngredientList = ({
  ingredients,
  ingredientOptions,
  isAddingIngredient,
  onEditingChange,
}: IngredientListProps) => {
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

  const handleStartEdit = (ingredient: IngredientItem) => {
    setEditingIngredientId(ingredient.id);
    setEditIngredientName(ingredient.name);
    setEditQuantity(ingredient.quantity.toString());
    setEditUnit(ingredient.unit);
    onEditingChange(true);
  };

  const handleCancelIngredientForm = () => {
    setEditingIngredientId(null);
    setEditIngredientName('');
    setEditQuantity('');
    setEditUnit('');
    onEditingChange(false);
  };

  const handleSaveEdit = () => {
    if (!selectedProductId || !editingIngredientId || !isEditIngredientValid)
      return;

    dispatch(
      editIngredient({
        productId: selectedProductId,
        updatedIngredient: {
          id: editingIngredientId,
          name: editIngredientName.trim(),
          quantity: Number(editQuantity),
          unit: editUnit.trim(),
          cost: 0,
        },
      }),
    );

    toast.success(`Ingredient updated successfully`);

    handleCancelIngredientForm();
  };

  const handleDeleteIngredient = () => {
    if (!selectedProductId || !ingredientToDelete) return;

    dispatch(
      deleteIngredient({
        productId: selectedProductId,
        ingredientId: ingredientToDelete.id,
      }),
    );
    toast.success(`Ingredient deleted successfully`);

    setIngredientToDelete(null);
    setIsConfirmOpen(false);
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
                    options={ingredientOptions}
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
                      <div className='relative group/button'>
                        <Button
                          icon={faPen}
                          variant='icon-only'
                          className='text-gray-400 hover:text-[#305e88]'
                          aria-label={`Edit ${name}`}
                          onClick={() => handleStartEdit(ingredient)}
                          disabled={isAddingIngredient}
                        />
                        {isAddingIngredient && (
                          <span
                            className={`absolute right-0 bottom-full w-max whitespace-normal rounded bg-slate-800 text-white px-2 py-1 text-xs opacity-0 translate-y-3 group-hover/button:opacity-100 group-hover:translate-y-3 transition-all duration-200 ease-out z-10 shadow-lg`}
                          >
                            Complete or cancel the current form
                          </span>
                        )}
                      </div>
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
