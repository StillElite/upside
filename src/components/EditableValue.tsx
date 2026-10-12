import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import { useState } from 'react';
import { formatMoney } from '../utils/formatMoney';

export interface EditableValueProps {
  title: string;
  value?: number;
  isCurrency?: boolean;
  onSave: (newValue: number) => void;
}

export const EditableValue = ({
  title,
  value,
  isCurrency,
  onSave,
}: EditableValueProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [valueCountInput, setValueCountInput] = useState(
    value?.toString() ?? '',
  );
  const valueCountClass = value ? '' : 'text-gray-400 font-normal';

  let valueDisplay: string | number = '-';

  if (value !== undefined && value > 0) {
    valueDisplay = isCurrency ? formatMoney(value) : value;
  }

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    setValueCountInput(value?.toString() ?? '');
  };

  return (
    <div className='flex justify-between'>
      <span className='text-neutral-500'>{title}</span>
      <div>
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(Number(valueCountInput));
              setIsEditing(false);
            }}
          >
            <input
              type='number'
              min='1'
              step='1'
              value={valueCountInput}
              onChange={(e) => setValueCountInput(e.target.value)}
              className='h-7 w-16 rounded-md border border-gray-300 bg-white px-2 text-right text-[#1c2b3d]'
            />
            <Button
              type='submit'
              icon={faCheck}
              variant='icon-only'
              className='text-xs mx-2'
              aria-label='Save'
            />
            <Button
              type='button'
              icon={faTimes}
              variant='icon-only'
              className='text-xs'
              aria-label='Cancel'
              onClick={() => setIsEditing((prev) => !prev)}
            />
          </form>
        ) : (
          <>
            <strong className={valueCountClass}>{valueDisplay}</strong>
            <Button
              icon={faPen}
              variant='icon-only'
              className='text-gray-400 hover:text-[#305e88] pl-2'
              aria-label={`edit value count`}
              onClick={() => handleEdit()}
            />
          </>
        )}
      </div>
    </div>
  );
};
