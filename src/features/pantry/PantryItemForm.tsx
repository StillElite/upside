import { Button } from '../../components/Button';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { PACKAGE_UNIT_OPTIONS } from '../../constants/unit';
import { PantryItem } from '../../types/pantry';

export interface PantryItemFormProps {
  item: PantryItem;
  editPantryItemName: string;
  editPantryItemSize: string;
  editPantryItemUnit: string;
  editPantryItemPrice: string;
  onEditNameChange: (value: string) => void;
  onEditSizeChange: (value: string) => void;
  onEditUnitChange: (value: string) => void;
  onEditPriceChange: (value: string) => void;
  onCancel: () => void;
  isValid: boolean;
  onSubmit: () => void;
}

export const PantryItemForm = ({
  item,
  editPantryItemName,
  editPantryItemSize,
  editPantryItemUnit,
  editPantryItemPrice,
  onEditNameChange,
  onEditSizeChange,
  onEditUnitChange,
  onEditPriceChange,
  onSubmit,
  onCancel,
  isValid,
}: PantryItemFormProps) => {
  const addButtonClasses = isValid
    ? 'w-6 h-6 rounded-full bg-[#305e88] text-white hover:bg-[#274f72]'
    : 'w-6 h-6 rounded-full bg-slate-200 text-slate-400';

  const { id, name, packageSize, packageUnit, packagePrice } = item;

  return (
    <tr id={id} className='border-t border-[#c6c8d2] bg-[#E0E7EC]'>
      <td className='px-4 py-3'>
        <input
          id={`pantry-item-${name}`}
          placeholder='name'
          value={editPantryItemName}
          onChange={(e) => onEditNameChange(e.target.value)}
          className='h-[38px] w-48 rounded-[4px] border border-[#c6c8d2] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#305e88] focus:border-[#305e88]'
        />
      </td>

      <td className='px-3 py-3 text-right'>
        <div className='flex items-center justify-end gap-2'>
          <input
            id={`pantry-item-${packageSize}`}
            value={editPantryItemSize}
            onChange={(e) => onEditSizeChange(e.target.value)}
            type='number'
            className='h-[38px] w-20 rounded-[4px] border border-[#c6c8d2] px-3 text-sm focus:border-[#305e88] focus:outline-none focus:ring-2 focus:ring-[#305e88]'
          />
          <Select
            inputId={`pantry-item-${packageUnit}`}
            options={PACKAGE_UNIT_OPTIONS}
            value={
              PACKAGE_UNIT_OPTIONS.find(
                (opt) => opt.value === editPantryItemUnit,
              ) || null
            }
            onChange={(option) => onEditUnitChange(option?.value ?? '')}
            isClearable
            placeholder='Unit'
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: state.isFocused ? '#305e88' : base.borderColor,
                boxShadow: state.isFocused
                  ? '0 0 0 2px #305e88'
                  : base.boxShadow,
                '&:hover': {
                  borderColor: state.isFocused ? '#305e88' : base.borderColor,
                },
              }),
            }}
            className='w-28 rounded-md text-sm text-left'
          />
        </div>
      </td>

      <td className='px-4 py-3 text-right'>
        <div className='relative inline-block'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'>
            $
          </span>
          <input
            id={`pantry-item-${packagePrice}`}
            value={editPantryItemPrice}
            onChange={(e) => onEditPriceChange(e.target.value)}
            type='number'
            step='0.01'
            min='0'
            className='h-[38px] w-24 rounded-[4px] border border-[#c6c8d2] pl-7 pr-3 text-right text-sm focus:border-[#305e88] focus:outline-none focus:ring-2 focus:ring-[#305e88]'
          />
        </div>
      </td>

      <td className='px-4 py-3 text-right'>
        ${(item.packagePrice / item.packageSize).toFixed(2)}/ {item.packageUnit}
      </td>

      <td className='px-4 py-3 text-right'>
        <div className='flex justify-end items-center gap-1'>
          <Button
            type='button'
            icon={faPlus}
            variant='icon-only'
            className={addButtonClasses}
            aria-label='Save Pantry Item'
            onClick={onSubmit}
            disabled={!isValid}
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
      </td>
    </tr>
  );
};
