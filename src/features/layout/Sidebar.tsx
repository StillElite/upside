import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/Button';
import {
  faCartShopping,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/products';
import { useRef, useState } from 'react';

interface SidebarProps {
  products: Product[];
  selectedProductId: string | null;
  activeView: 'product' | 'pantry';
  setSelectedProductId: (productId: string | null) => void;
  setActiveView: (viewName: 'product' | 'pantry') => void;
  onAddProduct: () => void;
}

export const Sidebar = ({
  products,
  selectedProductId,
  activeView,
  setSelectedProductId,
  setActiveView,
  onAddProduct,
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const listRef = useRef<HTMLDivElement | null>(null);

  const asideClasses =
    'flex h-full w-72 flex-col overflow-hidden border-r border-slate-700 bg-[#2f4559] text-white';

  const filteredProducts = products.filter((products) =>
    products.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const handleScrollProducts = () => {
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
    <aside className={asideClasses} aria-label='Sidebar navigation'>
      <div className='bg-[#2b3f51] p-6 w-full shadow-md border-b border-slate-900 flex justify-center'>
        <img src='/upside-logo.png' alt='Upside logo' />
      </div>
      <div className='flex flex-col justify-center pt-5 pb-4 px-4 gap-5'>
        <Button
          text={'New Product'}
          className='w-full'
          icon={faPlus}
          onClick={(e) => {
            e.currentTarget.blur();
            onAddProduct();
          }}
        />

        <div className='relative w-full max-w-md'>
          <label htmlFor='product-filter' className='sr-only'>
            Search ingredients
          </label>

          <FontAwesomeIcon
            icon={faSearch}
            className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-300'
            aria-hidden='true'
          />

          <input
            id='product-filter'
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className='w-full rounded-md border border-white/10 bg-[#284760] pl-9 pr-3 py-2 text-sm text-white outline-none placeholder:text-slate-300 focus:border-[#6f95b8] focus:ring-2 focus:ring-[#6f95b8]/30'
          />
        </div>
      </div>
      <nav className='pb-6 min-h-0 flex flex-1 flex-col'>
        <button
          type='button'
          className={`w-full px-6 py-4 text-left text-xs transition-colors flex items-center ${
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
        <div ref={listRef} className='flex-1 overflow-y-auto custom-scrollbar'>
          <ul>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
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
                        handleScrollProducts();
                        setActiveView('product');
                        setSearchTerm('');
                      }}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {product.name}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className='px-6 py-4 text-sm text-slate-400'>
                No results found
              </li>
            )}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
