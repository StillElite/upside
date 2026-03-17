import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/Button';
import { faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/products';

interface SidebarProps {
  products: Product[];
  selectedProductId: string | null;
  activeView: 'product' | 'pantry';
  setSelectedProductId: (productId: string | null) => void;
  setActiveView: (viewName: 'product' | 'pantry') => void;
}

export const Sidebar = ({
  products,
  selectedProductId,
  activeView,
  setSelectedProductId,
  setActiveView,
}: SidebarProps) => {
  const asideClasses =
    'flex h-full w-72 flex-col overflow-hidden border-r border-slate-700 bg-[#2f4559] text-white';

  return (
    <aside className={asideClasses} aria-label='Sidebar navigation'>
      <div className='bg-[#2b3f51] p-6 w-full shadow-md border-b border-slate-900 flex justify-center'>
        <img src='/upside-logo.png' alt='Upside logo' />
      </div>
      <div className='flex justify-center py-5 px-4'>
        <Button text={'New Product'} className='w-full' icon={faPlus} />
      </div>
      <nav className='pb-6 min-h-0 flex flex-1 flex-col'>
        <button
          type='button'
          className={`w-full px-6 py-3 text-left text-xs transition-colors flex items-center ${
            activeView === 'pantry'
              ? 'bg-[#22384c] font-semibold text-white'
              : ' text-slate-300 hover:bg-[#274f72] hover:text-white'
          }`}
          onClick={() => {
            setActiveView('pantry');
            setSelectedProductId(null);
          }}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            aria-hidden='true'
            className='text-xs mr-2'
          />
          PANTRY
        </button>
        <div className='flex-1 overflow-y-auto custom-scrollbar'>
          <ul>
            {products.map((product) => {
              const isActive = selectedProductId === product.id;

              return (
                <li key={product.id} className='border-t border-white/10'>
                  <button
                    type='button'
                    className={`w-full py-3 pl-12 text-left transition-colors ${
                      isActive
                        ? 'bg-[#22384c] font-semibold text-white'
                        : 'text-slate-300 hover:bg-[#274f72] hover:text-white'
                    }`}
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setActiveView('product');
                    }}
                  >
                    {product.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
