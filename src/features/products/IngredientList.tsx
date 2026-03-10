import { IngredientItem } from '../../types/products';
import { formatMoney } from '../../utils/formatMoney';

export interface IngredientListProps {
  ingredients: IngredientItem[];
}

export const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <>
      <h2 className='text-[#1c2b3d] font-semibold border-b border-[#c6c8d2] pb-2 pt-8'>
        Ingredients
      </h2>
      <ul className='text-[#1c2b3d]'>
        {ingredients.map((ingredient, index) => {
          const { id, name, quantity, unit, cost } = ingredient;
          const displayIndex = index + 1;
          return (
            <li key={id}>
              <div className='flex items-center gap-3 border-b border-[#c6c8d2] py-4'>
                <span className='flex items-center justify-center w-6 h-6 rounded-full bg-[#96a2af] text-white text-[16px] font-semibold'>
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
    </>
  );
};
