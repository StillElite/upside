import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';
import { RecipeIngredient } from '../../../types/products';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import {
  addIngredient,
  editIngredient,
} from '../../../store/slices/productSlice';
import { IngredientForm } from './IngredientForm';
import { IngredientList } from './IngredientList';
import toast from 'react-hot-toast';
import { AddPantryItemModal } from '../../pantry/AddPantryItemModal';
import { PantryItem } from '../../../types/pantry';
import { addItem } from '../../../store/slices/pantrySlice';

export interface IngredientSectionProps {
  recipeIngredients: RecipeIngredient[];
}

export type IngredientOption = {
  value: string;
  label: string;
  pantryItemId?: string;
  isNew?: boolean;
};

export const IngredientSection = ({
  recipeIngredients,
}: IngredientSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const [isEditingFlow, setIsEditingFlow] = useState(false);
  const [editingIngredientId, setEditingIngredientId] = useState<string | null>(
    null,
  );
  const [editIngredientName, setEditIngredientName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editRecipeUnit, setEditRecipeUnit] = useState('');

  const isEditIngredientValid =
    editIngredientName.trim() !== '' &&
    editQuantity.trim() !== '' &&
    editRecipeUnit.trim() !== '';

  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );

  const [selectedIngredientOption, setSelectedIngredientOption] =
    useState<IngredientOption | null>(null);

  const [newIngredientName, setNewIngredientName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newRecipeUnit, setNewRecipeUnit] = useState('');
  const [pendingIngredient, setPendingIngredient] =
    useState<RecipeIngredient | null>(null);
  const [isPendingEdit, setIsPendingEdit] = useState(false);
  const [isAddPantryItemOpen, setIsAddPantryItemOpen] = useState(false);

  const pantryItems = useSelector(
    (state: RootState) => state.pantry.pantryItems,
  );

  const ingredientOptions: IngredientOption[] = pantryItems.map((item) => ({
    value: item.name,
    label: item.name,
    pantryItemId: item.id,
  }));

  const isNewIngredientValid =
    newIngredientName.trim() !== '' &&
    newQuantity.trim() !== '' &&
    newRecipeUnit.trim() !== '';

  const handleAddIngredient = (ingredient: RecipeIngredient) => {
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

  const handleAddItem = (newItemData: {
    name: string;
    packageSize: number;
    packageUnit: string;
    packagePrice: number;
  }) => {
    if (!selectedProductId) return;

    // Adds new Item to pantry
    const newItem: PantryItem = {
      id: crypto.randomUUID(),
      name: newItemData.name,
      packageSize: newItemData.packageSize,
      packageUnit: newItemData.packageUnit,
      packagePrice: newItemData.packagePrice,
    };

    if (!pendingIngredient) return;

    dispatch(addItem(newItem));

    // Adds new Item to recipe ingredient list

    if (pendingIngredient) {
      const updatedIngredient: RecipeIngredient = {
        ...pendingIngredient,
        pantryItemId: newItem.id,
      };

      if (isPendingEdit) {
        dispatch(
          editIngredient({
            productId: selectedProductId,
            updatedIngredient: updatedIngredient,
          }),
        );

        handleCancelIngredientForm();
      } else {
        handleAddIngredient(updatedIngredient);
      }

      toast.success(`${updatedIngredient.name} added successfully`);

      setPendingIngredient(null);
      setIsPendingEdit(false);
    }

    setIsAddPantryItemOpen(false);
    setIsEditingFlow(false);

    setNewIngredientName('');
    setNewQuantity('');
    setNewRecipeUnit('');
    setIsAddingIngredient(false);
  };

  const handleSaveNewIngredient = () => {
    if (!isNewIngredientValid) return;

    const newIngredient: RecipeIngredient = {
      id: crypto.randomUUID(),
      name: newIngredientName.trim(),
      quantity: Number(newQuantity),
      recipeUnit: newRecipeUnit.trim(),
      cost: 0,
    };

    if (selectedIngredientOption?.isNew) {
      setPendingIngredient(newIngredient);
      setIsPendingEdit(false);
      setIsAddPantryItemOpen(true);
      return;
    }

    if (selectedIngredientOption?.pantryItemId) {
      const updatedIngredient: RecipeIngredient = {
        ...newIngredient,
        pantryItemId: selectedIngredientOption.pantryItemId,
      };

      handleAddIngredient(updatedIngredient);
      toast.success(`${updatedIngredient.name} added successfully`);
    }

    setNewIngredientName('');
    setNewQuantity('');
    setNewRecipeUnit('');
    setIsAddingIngredient(false);
  };

  const handleCancelIngredientForm = () => {
    setEditingIngredientId(null);
    setEditIngredientName('');
    setEditQuantity('');
    setEditRecipeUnit('');
    setIsEditingFlow(false);
  };

  const handleStartEdit = (recipeIngredient: RecipeIngredient) => {
    setEditingIngredientId(recipeIngredient.id);
    setEditIngredientName(recipeIngredient.name);
    setEditQuantity(recipeIngredient.quantity.toString());
    setEditRecipeUnit(recipeIngredient.recipeUnit);
    setIsEditingFlow(true);

    const newIngredientOption = {
      value: recipeIngredient.name,
      label: recipeIngredient.name,
      pantryItemId: recipeIngredient.pantryItemId,
    };
    setSelectedIngredientOption(newIngredientOption);
  };

  const handleSaveEdit = () => {
    if (
      !selectedProductId ||
      !editingIngredientId ||
      !isEditIngredientValid ||
      !selectedIngredientOption
    ) {
      return;
    }

    const editingIngredient = {
      id: editingIngredientId,
      pantryItemId: selectedIngredientOption.pantryItemId ?? '',
      name: editIngredientName.trim(),
      quantity: Number(editQuantity),
      recipeUnit: editRecipeUnit.trim(),
      cost: 0,
    };

    if (selectedIngredientOption?.isNew) {
      setPendingIngredient(editingIngredient);
      setIsPendingEdit(true);
      setIsAddPantryItemOpen(true);
      return;
    }

    dispatch(
      editIngredient({
        productId: selectedProductId,
        updatedIngredient: {
          id: editingIngredientId,
          name: editIngredientName.trim(),
          quantity: Number(editQuantity),
          recipeUnit: editRecipeUnit.trim(),
          cost: 0,
        },
      }),
    );
    toast.success(`${editIngredientName} updated successfully`);
    handleCancelIngredientForm();
  };

  const handleToggleAddIngredient = () => {
    setIsAddingIngredient((prev) => !prev);
    setNewIngredientName('');
    setNewQuantity('');
    setNewRecipeUnit('');
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
                disabled={isEditingFlow}
              />
              {isEditingFlow && (
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
            recipeUnit={newRecipeUnit}
            options={ingredientOptions}
            onIngredientNameChange={setNewIngredientName}
            onIngredientOptionChange={setSelectedIngredientOption}
            onQuantityChange={setNewQuantity}
            onUnitChange={setNewRecipeUnit}
            onSave={handleSaveNewIngredient}
            onCancel={handleToggleAddIngredient}
            isValid={isNewIngredientValid}
          />
        </div>
      )}
      <AddPantryItemModal
        isOpen={isAddPantryItemOpen}
        onClose={() => setIsAddPantryItemOpen(false)}
        onAddItem={handleAddItem}
      />

      <div
        ref={listRef}
        className='custom-scrollbar min-h-0 flex-1 overflow-y-auto'
      >
        <IngredientList
          recipeIngredients={recipeIngredients}
          ingredientOptions={ingredientOptions}
          isAddingIngredient={isAddingIngredient}
          isEditIngredientValid={isEditIngredientValid}
          onEditingChange={setIsEditingFlow}
          onIngredientOptionChange={setSelectedIngredientOption}
          editingIngredientId={editingIngredientId}
          setEditIngredientName={setEditIngredientName}
          setEditQuantity={setEditQuantity}
          setEditRecipeUnit={setEditRecipeUnit}
          editIngredientName={editIngredientName}
          editQuantity={editQuantity}
          editRecipeUnit={editRecipeUnit}
          onStartEdit={handleStartEdit}
          onSave={isEditingFlow ? handleSaveEdit : handleSaveNewIngredient}
          onCancel={handleCancelIngredientForm}
        />
      </div>
    </div>
  );
};
