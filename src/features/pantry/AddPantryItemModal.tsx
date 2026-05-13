import { useEffect, useState } from 'react';
import { FormField } from '../../components/FormField';
import { FormModal } from '../../components/FormModal';
import Select from 'react-select';
import { PACKAGE_UNIT_OPTIONS } from '../../constants/unit';

export interface AddPantryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: {
    name: string;
    packageSize: number;
    packageUnit: string;
    packagePrice: number;
  }) => void;
  initialName?: string;
}

export const AddPantryItemModal = ({
  isOpen,
  onClose,
  onAddItem,
  initialName,
}: AddPantryItemModalProps) => {
  const [name, setName] = useState(initialName ?? '');
  const [packageSize, setPackageSize] = useState('');
  const [packageUnit, setPackageUnit] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setName(initialName ?? '');
    }
  }, [isOpen, initialName]);

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a name.';
    }

    if (!packageSize.trim()) {
      newErrors.packageSize = 'Please enter the package size.';
    }
    if (!packageUnit.trim()) {
      newErrors.packageUnit = 'Please enter a unit.';
    }
    if (!packagePrice) {
      newErrors.packagePrice = 'Please enter the price.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddItem({
      name: name.trim(),
      packageSize: Number(packageSize),
      packageUnit: packageUnit.trim(),
      packagePrice: Number(packagePrice),
    });

    setName('');
    setPackageSize('');
    setPackageUnit('');
    setPackagePrice('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName('');
    setPackageSize('');
    setPackageUnit('');
    setPackagePrice('');
    setErrors({});
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title='Add Pantry Item'
      cancelLabel='Cancel'
      submitLabel='Save Item'
      onSubmit={handleSubmit}
    >
      <div className='space-y-4'>
        <FormField
          id='item-name'
          label='Name'
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
        />

        <div className='flex gap-4'>
          <FormField
            id='item-package-size'
            label='Package Size'
            type='number'
            value={packageSize}
            min={1}
            onChange={(value) => {
              setPackageSize(value);
              setErrors((prev) => ({ ...prev, packageSize: '' }));
            }}
            error={errors.packageSize}
          />
          <div className='flex-1 space-y-1'>
            <label
              htmlFor='item-package-unit'
              className='block text-sm font-medium text-[#38506a]'
            >
              Package Unit
            </label>
            <Select
              inputId='item-package-unit'
              options={PACKAGE_UNIT_OPTIONS}
              value={
                PACKAGE_UNIT_OPTIONS.find((opt) => opt.value === packageUnit) ||
                null
              }
              onChange={(option) => {
                setPackageUnit(option?.value ?? '');
                setErrors((prev) => ({ ...prev, packageUnit: '' }));
              }}
              isClearable
              placeholder='Select unit'
              styles={{
                control: (base, state) => ({
                  ...base,
                  width: '100%',
                  borderColor: state.isFocused ? '#305e88' : base.borderColor,
                  boxShadow: state.isFocused
                    ? '0 0 0 2px #305e88'
                    : base.boxShadow,
                  '&:hover': {
                    borderColor: state.isFocused ? '#305e88' : base.borderColor,
                  },
                }),
              }}
              className='w-full rounded-md text-sm'
              // className='min-w-[140px] rounded-md px-2 py-1 text-sm'
            />
          </div>
        </div>

        <FormField
          id='item-package-price'
          label='Price'
          type='number'
          step='0.01'
          prefix='$'
          min={0}
          value={packagePrice}
          onChange={(value) => {
            setPackagePrice(value);
            setErrors((prev) => ({ ...prev, packagePrice: '' }));
          }}
          error={errors.packagePrice}
        />
      </div>
    </FormModal>
  );
};
