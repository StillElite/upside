import { Header } from '../../components/Header';
import { PantryTable } from './PantryTable';
import { PantryToolbar } from './PantryToolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const PantryView = () => {
  const pantryItems = useSelector(
    (state: RootState) => state.pantry.pantryItems,
  );

  return (
    <div className='flex flex-col h-full min-h-0'>
      <Header title='Pantry' />
      <h2 id='pantry-section' className='sr-only'>
        Pantry ingredients and costs
      </h2>

      <div
        aria-labelledby='pantry-section'
        className='flex flex-col flex-1 p-8 bg-[#f3f5f2] overflow-hidden'
      >
        <PantryToolbar />
        <PantryTable ingredients={pantryItems} />
        <footer className='shrink-0 pt-6 pb-2 mt-auto border-t border-[#c6c8d2]/40 bg-[#f3f5f2]'>
          <p className='text-[#1c2b3d]/50 italic text-[13px] tracking-wide'>
            Pantry ingredients provide the base cost data used in all recipe
            calculations.
          </p>
        </footer>
      </div>
    </div>
  );
};
