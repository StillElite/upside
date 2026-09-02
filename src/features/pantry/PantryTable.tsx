import { PantryItem } from '../../types/pantry';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { ConfirmModal } from '../../components/ConfirmModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { editItem, deleteItem } from '../../store/slices/pantrySlice';
import toast from 'react-hot-toast';
import { PantryItemForm } from './PantryItemForm';
import React from 'react';

interface PantryTableProps {
  pantryItems: PantryItem[];
}

export type PantryItemOption = {
  value: string;
  label: string;
};

export const PantryTable = ({ pantryItems }: PantryTableProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [editPantryItemForm, setEditPantryItemForm] = useState({
    id: '',
    name: '',
    packageSize: '',
    packageUnit: '',
    packagePrice: '',
  });

  const isEditPantryItemValid =
    editPantryItemForm.name.trim() !== '' &&
    editPantryItemForm.packageSize.trim() !== '' &&
    editPantryItemForm.packageUnit.trim() !== '' &&
    editPantryItemForm.packagePrice.trim() !== '';

  const fieldsToWatch: (keyof PantryItem)[] = [
    'name',
    'packageSize',
    'packageUnit',
    'packagePrice',
  ];

  const hasFormChanged = (
    original: PantryItem | null,
    edited: PantryItem | null,
    fieldsToWatch: (keyof PantryItem)[],
  ) => {
    if (!original || !edited) return original !== edited;
    return fieldsToWatch.some((key) => original[key] !== edited[key]);
  };

  const originalIngredient =
    pantryItems.find((pantryItem) => pantryItem.id === editPantryItemForm.id) ??
    null;

  const handleEditFormChange = (
    field: keyof typeof editPantryItemForm,
    value: string,
  ) => {
    setEditPantryItemForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [pantryItemToDelete, setPantryItemToDelete] =
    useState<PantryItem | null>(null);

  const [editingPantryItemId, setEditingPantryItemId] = useState<string | null>(
    null,
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const confirmMessage = (
    <>
      Are you sure you want to delete{' '}
      <strong>{pantryItemToDelete?.name}</strong>?
    </>
  );

  const handleCancelPantryForm = () => {
    setEditPantryItemForm({
      id: '',
      name: '',
      packageSize: '',
      packageUnit: '',
      packagePrice: '',
    });

    setEditingPantryItemId('');
  };

  const handleSaveEditPantryItem = () => {
    if (!editPantryItemForm.id || !isEditPantryItemValid) {
      return;
    }

    const editingPantryItem = {
      id: editPantryItemForm.id,
      name: editPantryItemForm.name.trim(),
      packageSize: parseFloat(editPantryItemForm.packageSize),
      packageUnit: editPantryItemForm.packageUnit.trim(),
      packagePrice: parseFloat(editPantryItemForm.packagePrice),
    };

    dispatch(
      editItem({
        updatedPantryItem: {
          id: editPantryItemForm.id,
          name: editPantryItemForm.name.trim(),
          packageSize: parseFloat(editPantryItemForm.packageSize),
          packageUnit: editPantryItemForm.packageUnit.trim(),
          packagePrice: parseFloat(editPantryItemForm.packagePrice),
        },
      }),
    );

    if (hasFormChanged(originalIngredient, editingPantryItem, fieldsToWatch)) {
      toast.success(`${editPantryItemForm.name} updated successfully`);
    }

    handleCancelPantryForm();
  };

  const handleStartEditPantryItem = (pantryItem: PantryItem, id: string) => {
    setEditPantryItemForm({
      id: pantryItem.id,
      name: pantryItem.name,
      packageSize: pantryItem.packageSize.toString(),
      packageUnit: pantryItem.packageUnit,
      packagePrice: pantryItem.packagePrice.toString(),
    });

    setEditingPantryItemId(id);
  };

  const handleDeletePantryItem = () => {
    if (!pantryItemToDelete) return;

    dispatch(
      deleteItem({
        pantryItemId: pantryItemToDelete.id,
      }),
    );
    toast.success(`${pantryItemToDelete.name} deleted successfully`);

    setPantryItemToDelete(null);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <div className='mt-6 flex-1 overflow-y-auto custom-scrollbar rounded-lg bg-white border border-[#c6c8d2]'>
        <table className='w-full table-fixed text-sm text-[#1c2b3d]'>
          <thead className='sticky top-0 z-10 bg-[#e0e7ec] text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold w-[30%]'>Ingredient</th>
              <th className='px-4 py-3 font-semibold w-[25%] text-right'>
                Package
              </th>
              <th className='px-4 py-3 font-semibold w-[15%] text-right'>
                Package Price
              </th>
              <th className='px-4 py-3 font-semibold w-[15%] text-right'>
                Unit Cost
              </th>
              <th className='px-4 py-3 font-semibold w-[15%] text-right'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='bg-white rounded-lg'>
            {pantryItems.map((item) => {
              const { id, name, packageSize, packageUnit, packagePrice } = item;
              const isEditing = editingPantryItemId === id;

              return (
                <React.Fragment key={item.id}>
                  {isEditing ? (
                    <PantryItemForm
                      item={item}
                      onEditNameChange={(value) =>
                        handleEditFormChange('name', value)
                      }
                      onEditSizeChange={(value) =>
                        handleEditFormChange('packageSize', value)
                      }
                      onEditUnitChange={(value) =>
                        handleEditFormChange('packageUnit', value)
                      }
                      onEditPriceChange={(value) =>
                        handleEditFormChange('packagePrice', value)
                      }
                      editPantryItemName={editPantryItemForm.name}
                      editPantryItemSize={editPantryItemForm.packageSize}
                      editPantryItemUnit={editPantryItemForm.packageUnit}
                      editPantryItemPrice={editPantryItemForm.packagePrice}
                      onSubmit={handleSaveEditPantryItem}
                      onCancel={handleCancelPantryForm}
                      isValid={isEditPantryItemValid}
                    />
                  ) : (
                    <tr className='border-t border-[#c6c8d2] hover:bg-[#E0E7EC]'>
                      <td className='px-4 py-3'>{name}</td>

                      <td className='px-4 py-3 text-right'>
                        {packageSize} {packageUnit}
                      </td>

                      <td className='px-4 py-3 text-right'>
                        ${packagePrice.toFixed(2)}
                      </td>

                      <td className='px-4 py-3 text-right'>
                        ${(packagePrice / packageSize).toFixed(2)}/{' '}
                        {packageUnit}
                      </td>

                      <td className='px-4 py-3 text-right'>
                        <div className='flex justify-end items-center gap-1'>
                          <Button
                            icon={faPencil}
                            variant='icon-only'
                            className='text-slate-400 hover:text-[#305e88]'
                            aria-label={`Edit ${name}`}
                            onClick={() => handleStartEditPantryItem(item, id)}
                          />
                          <span className='px-2'>|</span>
                          <Button
                            icon={faTrash}
                            variant='icon-only'
                            className='text-slate-400 hover:text-[#ba3d3d]'
                            aria-label={`Delete ${name}`}
                            onClick={() => {
                              setPantryItemToDelete(item);
                              setIsConfirmOpen(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            <ConfirmModal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={handleDeletePantryItem}
              title='Delete Product'
              confirmLabel='Delete'
              message={confirmMessage}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};
