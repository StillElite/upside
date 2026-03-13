import {
  faCaretRight,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { IngredientItem } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IngredientListProps {
  ingredients: IngredientItem[];
}
export const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <div className='flex flex-col flex-1 min-h-0'>
      <div className='flex items-center justify-between border-b border-[#c6c8d2] pb-2 pt-8 shrink-0'>
        <h2 className='text-[#1c2b3d] font-semibold'>Ingredients</h2>

        <div className='flex gap-2'>
          <Button text={'Add Ingredient'} className='text-xs' icon={faPlus} />
          <Button
            text={'Set Reference'}
            className='text-xs'
            variant='secondary'
            icon={faCaretRight}
            iconPosition='right'
          />
        </div>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto custom-scrollbar'>
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
                    {name} - {quantityDisplay} -
                    <strong>{formatMoney(cost)}</strong>
                  </div>
                  <div className='flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <FontAwesomeIcon
                      icon={faPen}
                      className='text-gray-400 hover:text-[#305e88] cursor-pointer transition-colors duration-150'
                    />

                    <FontAwesomeIcon
                      icon={faTrash}
                      className='text-gray-400 hover:text-[#ba3d3d] cursor-pointer transition-colors duration-150'
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
