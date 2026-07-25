import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faPen,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Product } from '../../types/products';
import {
  setSelectedProductId,
  updateProductName,
} from '../../store/slices/productSlice';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { hasDuplicateProductName } from '../../utils/hasDuplicateProductName';

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
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productNameInput, setProductNameInput] = useState(product.name);
  const [shouldSelectInput, setShouldSelectInput] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);

  const isActive = selectedProductId === product.id;
  const isEditing = editingProductId === product.id;

  const handleSubmit = () => {
    const isDuplicateProductName = hasDuplicateProductName(
      products,
      productNameInput,
    );

    if (productNameInput.trim() === product.name) {
      setEditingProductId(null);
      setOpenMenuProductId(null);
      return;
    }
    if (isDuplicateProductName) {
      setShouldSelectInput(true);
      toast.error('A product with that name already exists.');
      return;
    }

    setEditingProductId(null);
    setOpenMenuProductId(null);

    dispatch(
      updateProductName({
        productId: product.id,
        newProductName: productNameInput.trim(),
      }),
    );

    toast.success(`Product name updated successfully`);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
      setShouldSelectInput(false);
    }
  }, [isEditing, shouldSelectInput]);

  return (
    <li
      key={product.id}
      ref={selectedProductId === product.id ? selectedItemRef : null}
      className='border-t border-white/10 relative'
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className='flex min-h-[48px] items-center'
        >
          <input
            ref={inputRef}
            id={`product-name-${product.id}`}
            autoComplete='off'
            value={productNameInput}
            onChange={(e) => {
              setProductNameInput(e.target.value);
            }}
            onBlur={handleSubmit}
            className='relative z-0 peer pb-[2px] pl-3 bg-transparent outline-none text-base text-white w-60 ml-9'
          />
        </form>
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
            className='flex-1 py-3 pl-12 pr-2 text-left transition-colors break-all'
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
            <ul className='absolute right-0 top-8 z-50 mt-1 rounded-md shadow-lg bg-[#22384c] p-2 text-xs space-y-1 mr-2 border border-white/10'>
              <li onClick={() => setEditingProductId(product.id)}>
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
