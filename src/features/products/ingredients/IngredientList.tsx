import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { formatMoney } from '../../../utils/formatMoney';
import { IngredientForm } from './IngredientForm';
import { RecipeIngredient } from '../../../types/products';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { deleteIngredient } from '../../../store/slices/productSlice';
import { ConfirmModal } from '../../../components/ConfirmModal';
import type { IngredientOption } from './IngredientSection';
import toast from 'react-hot-toast';
import { calculateIngredientCost } from '../../../utils/calculateIngredientCost';
import { PantryItem } from '../../../types/pantry';
import { formatUnit } from '../../../utils/formatUnit';
import { formatQuantity } from '../../../utils/formatQuantity';

export interface IngredientListProps {
  recipeIngredients: RecipeIngredient[];
  ingredientOptions: IngredientOption[];
  pantryItems: PantryItem[];
  isAddingIngredient: boolean;
  isEditIngredientValid: boolean;
  editingIngredientId: string | null;
  editIngredientName: string;
  editQuantity: string;
  editRecipeUnit: string;
  onEditNameChange: (value: string) => void;
  onEditQuantityChange: (value: string) => void;
  onEditRecipeUnitChange: (value: string) => void;
  onEditingChange: (isEditing: boolean) => void;
  onStartEdit: (recipeIngredient: RecipeIngredient) => void;
  onIngredientOptionChange: (option: IngredientOption | null) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const IngredientList = ({
  recipeIngredients,
  ingredientOptions,
  pantryItems,
  isAddingIngredient,
  isEditIngredientValid,
  editingIngredientId,
  editIngredientName,
  editQuantity,
  editRecipeUnit,
  onEditNameChange,
  onEditQuantityChange,
  onEditRecipeUnitChange,
  onStartEdit,
  onIngredientOptionChange,
  onSave,
  onCancel,
}: IngredientListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] =
    useState<RecipeIngredient | null>(null);

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
        {recipeIngredients.map((recipeIngredient, index) => {
          const { id, name, quantity, recipeUnit } = recipeIngredient;
          const numberDisplay = index + 1;
          const isEditing = editingIngredientId === id;

          const getIngredientCost = (recipeIngredient: RecipeIngredient) => {
            const pantryItem = pantryItems.find(
              (item) => item.id === recipeIngredient.pantryItemId,
            );

            return calculateIngredientCost(
              pantryItem?.packageSize ?? 0,
              pantryItem?.packageUnit ?? '',
              pantryItem?.packagePrice ?? 0,
              pantryItem?.gramsPerCup,
              recipeIngredient.quantity,
              recipeIngredient.recipeUnit,
            );
          };

          return (
            <li key={id}>
              <div className='group flex items-center justify-between border-b border-[#c6c8d2] px-2 py-4 transition-colors hover:bg-[#E0E7EC]'>
                {isEditing ? (
                  <IngredientForm
                    ingredientName={editIngredientName}
                    quantity={editQuantity}
                    recipeUnit={editRecipeUnit}
                    options={ingredientOptions}
                    onIngredientNameChange={onEditNameChange}
                    onIngredientOptionChange={onIngredientOptionChange}
                    onQuantityChange={onEditQuantityChange}
                    onUnitChange={onEditRecipeUnitChange}
                    onSave={onSave}
                    onCancel={onCancel}
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
                      <span>
                        {formatQuantity(quantity)}{' '}
                        {formatUnit(recipeUnit, quantity)}
                      </span>
                      <span>-</span>
                      <strong>
                        {formatMoney(getIngredientCost(recipeIngredient))}
                      </strong>
                    </div>

                    <div className='flex items-center gap-3 group-focus-within:opacity-100 transition-opacity'>
                      <div className='relative group/button'>
                        <Button
                          icon={faPen}
                          variant='icon-only'
                          className='text-gray-400 hover:text-[#305e88]'
                          aria-label={`Edit ${name}`}
                          onClick={() => onStartEdit(recipeIngredient)}
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
                          setIngredientToDelete(recipeIngredient);
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
