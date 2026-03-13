import { Header } from '../../components/Header';
import { pantryIngredients } from '../../data/mockData';
import { PantryTable } from './PantryTable';
import { PantryToolbar } from './PantryToolbar';

export const PantryView = () => {
  return (
    <div className='flex flex-col h-full min-h-0'>
      <Header title='Pantry' />

      <div className='flex-1 p-8 bg-[#f3f5f2] overflow-hidden'>
        <PantryToolbar />
        <PantryTable ingredients={pantryIngredients} />
      </div>
    </div>
  );
};
