import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PantryToolbar = () => {
  return (
    <div className='flex items-center gap-4'>
      <div className='relative w-full max-w-md'>
        <label htmlFor='ingredient-filter' className='sr-only'>
          Search ingredients
        </label>
        <FontAwesomeIcon
          icon={faSearch}
          className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
          aria-hidden='true'
        />

        <input
          id='ingredient-filter'
          type='text'
          placeholder='Search...'
          className='w-full rounded-md border border-[#c6c8d2] bg-white pl-9 pr-3 py-2 text-sm text-[#1c2b3d] shadow-sm focus:outline-none focus:border-[#315e88] focus-visible:ring-2 focus-visible:ring-[#315e88]'
        />
      </div>
      <Button text='Add Ingredient' icon={faPlus} />
    </div>
  );
};
