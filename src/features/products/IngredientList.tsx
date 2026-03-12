import { faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { IngredientItem } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';

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
            return (
              <li key={id}>
                <div className='flex items-center border-b border-[#c6c8d2] py-4'>
                  <span className='flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#315e88] text-white text-[14px] font-semibold'>
                    {index + 1}
                  </span>
                  <span className='font-medium px-2'>{name} -</span>
                  <span className='text-sm text-slate-600 pr-2'>
                    {quantity} {unit} -
                  </span>
                  <span className='text-sm text-slate-600'>
                    <strong>{formatMoney(cost)}</strong>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
