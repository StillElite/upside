import { useState } from 'react';
import { FormModal } from '../../components/FormModal';
import { FormField } from '../../components/FormField';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { hasDuplicateProductName } from '../../utils/hasDuplicateProductName';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProduct: (product: {
    name: string;
    sellPrice: number;
    sellIndividually: boolean;
    portionCount: number;
    individualPrice: number;
  }) => void;
}

export const NewProductModal = ({
  isOpen,
  onClose,
  onCreateProduct,
}: NewProductModalProps) => {
  const [name, setName] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellIndividually, setSellIndividually] = useState(false);
  const [portionCount, setPortionCount] = useState('');
  const [individualPrice, setIndividualPrice] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { products } = useSelector((state: RootState) => state.products);

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    const isDuplicateProductName = hasDuplicateProductName(products, name);

    if (isDuplicateProductName) {
      newErrors.name = 'A product with that name already exists.';
    }

    if (!name.trim()) {
      newErrors.name = 'Please enter a name.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreateProduct({
      name: name.trim(),
      sellPrice: Number(sellPrice),
      sellIndividually: sellIndividually,
      portionCount: Number(portionCount),
      individualPrice: Number(individualPrice),
    });

    setName('');
    setSellPrice('');
    setSellIndividually(false);
    setPortionCount('');
    setIndividualPrice('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName('');
    setSellPrice('');
    setSellIndividually(false);
    setPortionCount('');
    setIndividualPrice('');
    setErrors({});
    onClose();
  };

  const handleSellIndividuallyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = e.target.checked;
    setSellIndividually(checked);

    if (!checked) {
      setPortionCount('');
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title='New Product'
      cancelLabel='Cancel'
      submitLabel='Save Product'
      onSubmit={handleSubmit}
    >
      <div className='space-y-4'>
        <FormField
          id='product-name'
          label='Name'
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
        />

        <FormField
          id='product-price'
          label='Price (optional)'
          type='number'
          prefix='$'
          min={0}
          value={sellPrice}
          onChange={(value) => {
            setSellPrice(value);
            setErrors((prev) => ({ ...prev, sellPrice: '' }));
          }}
          error={errors.sellPrice}
        />

        <div className='flex items-center justify-between'>
          <label
            htmlFor='sell-individually'
            className='flex items-center gap-2 text-sm font-medium text-[#38506a]'
          >
            <input
              id='sell-individually'
              type='checkbox'
              checked={sellIndividually}
              onChange={handleSellIndividuallyChange}
              className='h-4 w-4 accent-[#305e88]'
            />
            Sell individually
          </label>

          <div className='flex items-center gap-2'>
            <label
              htmlFor='portion-count'
              className='text-sm font-medium text-[#38506a]'
            >
              Portions:
            </label>

            <input
              id='portion-count'
              type='number'
              value={portionCount}
              onChange={(e) => setPortionCount(e.target.value)}
              min='1'
              disabled={!sellIndividually}
              className='h-8 w-16 rounded-md border border-gray-300 bg-white px-2 text-base text-[#1c2b3d] outline-none focus:border-[#305e88] focus:ring-2 focus:ring-[#305e88] disabled:bg-[#eef3f7] disabled:text-[#6b7a8c]'
            />
          </div>
          <div className='flex items-center gap-2'>
            <label
              htmlFor='individual-price'
              className='text-sm font-medium text-[#38506a]'
            >
              Price:
            </label>

            <div className='relative'>
              <span className='absolute left-2 top-1/2 -translate-y-1/2 text-[#6b7a8c] text-sm'>
                $
              </span>

              <input
                id='individual-price'
                type='number'
                value={individualPrice}
                onChange={(e) => setIndividualPrice(e.target.value)}
                min='0'
                step='0.01'
                disabled={!sellIndividually}
                className='h-8 w-20 rounded-md border border-gray-300 bg-white pl-5 pr-2 text-base text-[#1c2b3d] outline-none focus:border-[#305e88] focus:ring-2 focus:ring-[#305e88] disabled:bg-[#eef3f7] disabled:text-[#6b7a8c]'
              />
            </div>
          </div>
        </div>
      </div>
    </FormModal>
  );
};
