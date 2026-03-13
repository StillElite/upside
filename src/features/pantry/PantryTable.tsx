import { PantryIngredient } from '../../types/pantry';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';

interface PantryTableProps {
  ingredients: PantryIngredient[];
}

export const PantryTable = ({ ingredients }: PantryTableProps) => {
  return (
    <div className='mt-6 overflow-hidden rounded-lg border border-[#c6c8d2]'>
      <table className='w-full table-fixed text-sm text-[#1c2b3d]'>
        <thead className='bg-[#e0e7ec] text-left '>
          <tr>
            <th className='px-4 py-3 font-semibold w-[40%]'>Ingredient</th>
            <th className='px-4 py-3 font-semibold w-[15%] text-right'>
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

        <tbody className='bg-white'>
          {ingredients.map((ingredient) => (
            <tr
              key={ingredient.id}
              className='border-t border-[#c6c8d2] hover:bg-[#E0E7EC]'
            >
              <td className='px-4 py-3'>{ingredient.name}</td>

              <td className='px-4 py-3 text-right'>
                {ingredient.packageSize} {ingredient.packageUnit}
              </td>

              <td className='px-4 py-3 text-right'>
                ${ingredient.packagePrice.toFixed(2)}
              </td>

              <td className='px-4 py-3 text-right'>
                ${(ingredient.packagePrice / ingredient.packageSize).toFixed(2)}{' '}
                / {ingredient.packageUnit}
              </td>

              <td className='px-4 py-3 text-right'>
                <div className='flex justify-end items-center gap-1'>
                  <Button
                    icon={faPencil}
                    variant='icon-only'
                    className='text-slate-400 hover:text-[#305e88]'
                  />
                  <span className='px-2'>|</span>
                  <Button
                    icon={faTrash}
                    variant='icon-only'
                    className='text-slate-400 hover:text-[#ba3d3d]'
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
