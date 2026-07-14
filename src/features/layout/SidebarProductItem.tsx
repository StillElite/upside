import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faPen,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Product } from '../../types/products';
import { setSelectedProductId } from '../../store/slices/productSlice';

interface SidebarProductItemProps {
  product: Product;
  selectedProductId: string | null;
  selectedItemRef: React.RefObject<HTMLLIElement | null>;
  productMenuRef: React.RefObject<HTMLDivElement | null>;
  openMenuProductId: string | null;
  setOpenMenuProductId: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveView: (viewName: 'product' | 'pantry') => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SidebarProductItem = ({
  product,
  selectedProductId,
  selectedItemRef,
  productMenuRef,
  openMenuProductId,
  setOpenMenuProductId,
  setActiveView,
  setSearchTerm,
}: SidebarProductItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const isActive = selectedProductId === product.id;
  const isEditing = false;

  return (
    <li
      key={product.id}
      ref={selectedProductId === product.id ? selectedItemRef : null}
      className='border-t border-white/10 relative'
    >
      {isEditing ? (
        <input
          id={`product-${product.name}`}
          value={product.name}
          className='relative z-0 peer pb-[2px] bg-white pl-3 border border-gray-300 rounded-md text-base text-[#1c2b3d] h-8 w-60'
        />
      ) : (
        <div
          ref={openMenuProductId === product.id ? productMenuRef : null}
          className={` group flex items-center ${
            isActive
              ? 'bg-[#22384c] font-semibold text-white'
              : 'hover:bg-[#274f72] hover:text-white focus-within:bg-[#274f72] focus-within:text-white'
          }`}
        >
          <button
            type='button'
            className='flex-1 py-3 pl-12 pr-2 text-left transition-colors'
            onClick={() => {
              dispatch(setSelectedProductId(product.id));
              setActiveView('product');
              setSearchTerm('');
              setOpenMenuProductId(null);
            }}
            aria-current={isActive ? 'true' : undefined}
          >
            {product.name}
          </button>

          <Button
            type='button'
            icon={faEllipsis}
            variant='icon-only'
            className='relative mr-4 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 hover:text-white focus:text-white'
            aria-label={`More options for ${product.id}`}
            onClick={(e) => {
              e.stopPropagation();

              setOpenMenuProductId((currentId) =>
                currentId === product.id ? null : product.id,
              );
            }}
          />
          {openMenuProductId === product.id && (
            <ul className='absolute right-0 top-8 z-50 mt-1 rounded-md  shadow-lg bg-[#22384c] p-2 text-xs space-y-1 mr-2 border border-white/10'>
              <li onClick={() => console.log('Item 1 clicked')}>
                <FontAwesomeIcon
                  icon={faPen}
                  aria-hidden='true'
                  className='text-xs'
                />{' '}
                Rename
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  aria-hidden='true'
                  className='text-xs mr-1'
                />
                Delete
              </li>
            </ul>
          )}
        </div>
      )}
    </li>
  );
};
