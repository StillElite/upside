import { faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { IngredientItem } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';

export interface IngredientListProps {
  ingredients: IngredientItem[];
}

export const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <div className='flex flex-col min-h-0'>
      <h2 className='text-[#1c2b3d] font-semibold border-b border-[#c6c8d2] pb-2 pt-8'>
        Ingredients
      </h2>
      <div className='flex-1 min-h-0 overflow-y-auto'>
        <ul className='text-[#1c2b3d]'>
          {ingredients.map((ingredient, index) => {
            const { id, name, quantity, unit, cost } = ingredient;
            const displayIndex = index + 1;
            return (
              <li key={id}>
                <div className='flex items-center gap-3 border-b border-[#c6c8d2] py-4'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-[#315e88] text-white text-[16px] font-semibold'>
                    {displayIndex}
                  </span>
                  <span className='font-medium'>{name}</span>
                  <span>
                    - {quantity} {unit} - <strong>{formatMoney(cost)}</strong>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Button
          text={'Add Ingredient'}
          className='bg-[#305e88] text-white'
          icon={faPlus}
        />
        <Button
          text={'Set Reference Cost'}
          className='bg-[#305e88] text-white'
          icon={faCaretRight}
          iconPosition='right'
        />
      </div>
    </div>
  );
};
