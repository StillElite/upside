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
import { AddIngredientRow } from './AddIngredientRow';

export interface IngredientListProps {
  ingredients: IngredientItem[];
  onAddIngredient: (ingredient: IngredientItem) => void;
}
export const IngredientList = ({
  ingredients,
  onAddIngredient,
}: IngredientListProps) => {
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleAddIngredient = (ingredient: IngredientItem) => {
    onAddIngredient(ingredient);

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

  return (
    <div className='flex flex-col flex-1 min-h-0'>
      <div className='flex items-center justify-between border-b border-[#c6c8d2] pb-2 pt-8 shrink-0'>
        <h2 className='text-[#1c2b3d] font-semibold'>Ingredients</h2>

        <div className='flex gap-2'>
          <Button
            text='Add Ingredient'
            className='text-xs'
            icon={isAddingIngredient ? faCaretDown : faCaretRight}
            iconPosition='right'
            onClick={() => setIsAddingIngredient((prev) => !prev)}
          />
          <Button
            text={'Set Reference'}
            className='text-xs'
            variant='secondary'
            icon={faCaretRight}
            iconPosition='right'
          />
        </div>
      </div>

      {isAddingIngredient && (
        <AddIngredientRow
          onAddIngredient={handleAddIngredient}
          onCancel={() => setIsAddingIngredient(false)}
        />
      )}

      <div
        ref={listRef}
        className='flex-1 min-h-0 overflow-y-auto custom-scrollbar'
      >
        <ul className='text-[#1c2b3d]'>
          {ingredients.map((ingredient, index) => {
            const { id, name, quantity, unit, cost } = ingredient;
            const quantityDisplay = `${quantity} ${unit}`;
            const numberDisplay = index + 1;

            return (
              <li key={id}>
                <div className='group flex items-center justify-between border-b border-[#c6c8d2] py-4 hover:bg-[#E0E7EC] transition-colors px-2'>
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
                  <div className='flex items-center gap-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity'>
                    <Button
                      icon={faPen}
                      variant='icon-only'
                      className='text-gray-400 hover:text-[#305e88]'
                      aria-label={`Edit ${name}`}
                    />
                    <Button
                      icon={faTrash}
                      variant='icon-only'
                      className='text-gray-400 hover:text-[#ba3d3d]'
                      aria-label={`Delete ${name}`}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
