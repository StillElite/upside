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
  const [addIngredientForm, setAddIngredientForm] = useState({
    name: '',
    quantity: '',
    recipeUnit: '',
  });
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    quantity: '',
    recipeUnit: '',
  });

  const isEditIngredientValid =
    editForm.name.trim() !== '' &&
    editForm.quantity.trim() !== '' &&
    editForm.recipeUnit.trim() !== '';

  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId,
  );

  const [selectedIngredientOption, setSelectedIngredientOption] =
    useState<IngredientOption | null>(null);

  const [pendingIngredient, setPendingIngredient] =
    useState<RecipeIngredient | null>(null);
  const [isPendingEdit, setIsPendingEdit] = useState(false);
  const [isAddPantryItemOpen, setIsAddPantryItemOpen] = useState(false);

  const pantryItems = useSelector(
    (state: RootState) => state.pantry.pantryItems,
  );

  const originalIngredient =
    recipeIngredients.find(
      (recipeIngredient) => recipeIngredient.id === editForm.id,
    ) ?? null;

  const ingredientOptions: IngredientOption[] = pantryItems.map((item) => ({
    value: item.name,
    label: item.name,
    pantryItemId: item.id,
  }));

  const isNewIngredientValid =
    addIngredientForm.name.trim() !== '' &&
    addIngredientForm.quantity.trim() !== '' &&
    addIngredientForm.quantity.trim() !== '';

  const fieldsToWatch: (keyof RecipeIngredient)[] = [
    'pantryItemId',
    'name',
    'quantity',
    'recipeUnit',
  ];

  const hasFormChanged = (
    original: RecipeIngredient | null,
    edited: RecipeIngredient | null,
    fieldsToWatch: (keyof RecipeIngredient)[],
  ) => {
    if (!original || !edited) return original !== edited;
    return fieldsToWatch.some((key) => original[key] !== edited[key]);
  };

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

    setAddIngredientForm({
      name: '',
      quantity: '',
      recipeUnit: '',
    });

    setIsAddingIngredient(false);
  };

  const handleAddFormChange = (
    field: keyof typeof addIngredientForm,
    value: string,
  ) => {
    setAddIngredientForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveNewIngredient = () => {
    if (!isNewIngredientValid) return;

    const newIngredient: RecipeIngredient = {
      id: crypto.randomUUID(),
      name: addIngredientForm.name.trim(),
      quantity: Number(addIngredientForm.quantity),
      recipeUnit: addIngredientForm.recipeUnit.trim(),
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

    setAddIngredientForm({
      name: '',
      quantity: '',
      recipeUnit: '',
    });
    setIsAddingIngredient(false);
  };

  const handleCancelIngredientForm = () => {
    setEditForm({
      id: '',
      name: '',
      quantity: '',
      recipeUnit: '',
    });
    setIsEditingFlow(false);
  };

  const handleStartEdit = (recipeIngredient: RecipeIngredient) => {
    setEditForm({
      id: recipeIngredient.id,
      name: recipeIngredient.name,
      quantity: recipeIngredient.quantity.toString(),
      recipeUnit: recipeIngredient.recipeUnit,
    });
    setIsEditingFlow(true);

    const newIngredientOption = {
      value: recipeIngredient.name,
      label: recipeIngredient.name,
      pantryItemId: recipeIngredient.pantryItemId,
    };
    setSelectedIngredientOption(newIngredientOption);
  };

  const handleEditFormChange = (
    field: keyof typeof editForm,
    value: string,
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveEdit = () => {
    if (
      !selectedProductId ||
      !editForm.id ||
      !isEditIngredientValid ||
      !selectedIngredientOption
    ) {
      return;
    }

    const editingIngredient = {
      id: editForm.id,
      pantryItemId: selectedIngredientOption.pantryItemId ?? '',
      name: editForm.name.trim(),
      quantity: Number(editForm.quantity),
      recipeUnit: editForm.recipeUnit.trim(),
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
          id: editForm.id,
          name: editForm.name.trim(),
          quantity: Number(editForm.quantity),
          recipeUnit: editForm.recipeUnit.trim(),
          cost: 0,
        },
      }),
    );

    if (hasFormChanged(originalIngredient, editingIngredient, fieldsToWatch)) {
      toast.success(`${editForm.name} updated successfully`);
    }

    handleCancelIngredientForm();
  };

  const handleToggleAddIngredient = () => {
    setIsAddingIngredient((prev) => !prev);
    setAddIngredientForm({
      name: '',
      quantity: '',
      recipeUnit: '',
    });
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
            ingredientName={addIngredientForm.name}
            quantity={addIngredientForm.quantity}
            recipeUnit={addIngredientForm.recipeUnit}
            options={ingredientOptions}
            onIngredientNameChange={(value) =>
              handleAddFormChange('name', value)
            }
            onQuantityChange={(value) => handleAddFormChange('quantity', value)}
            onUnitChange={(value) => handleAddFormChange('recipeUnit', value)}
            onIngredientOptionChange={setSelectedIngredientOption}
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
        initialName={pendingIngredient?.name ?? ''}
      />

      <div
        ref={listRef}
        className='custom-scrollbar min-h-0 flex-1 overflow-y-auto'
      >
        <IngredientList
          recipeIngredients={recipeIngredients}
          ingredientOptions={ingredientOptions}
          pantryItems={pantryItems}
          isAddingIngredient={isAddingIngredient}
          isEditIngredientValid={isEditIngredientValid}
          onEditingChange={setIsEditingFlow}
          onIngredientOptionChange={setSelectedIngredientOption}
          editingIngredientId={editForm.id}
          onEditNameChange={(value) => handleEditFormChange('name', value)}
          onEditQuantityChange={(value) =>
            handleEditFormChange('quantity', value)
          }
          onEditRecipeUnitChange={(value) =>
            handleEditFormChange('recipeUnit', value)
          }
          editIngredientName={editForm.name}
          editQuantity={editForm.quantity}
          editRecipeUnit={editForm.recipeUnit}
          onStartEdit={handleStartEdit}
          onSave={isEditingFlow ? handleSaveEdit : handleSaveNewIngredient}
          onCancel={handleCancelIngredientForm}
        />
      </div>
    </div>
  );
};
