import { useEffect, useState } from 'react';
import { FormField } from '../../components/FormField';
import { FormModal } from '../../components/FormModal';

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

        <div className='flex justify-between'>
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
          <FormField
            id='item-package-unit'
            label='Package Unit'
            value={packageUnit}
            onChange={(value) => {
              setPackageUnit(value);
              setErrors((prev) => ({ ...prev, packageUnit: '' }));
            }}
            error={errors.packageUnit}
          />
        </div>

        <FormField
          id='item-package-price'
          label='Price'
          type='number'
          step='any'
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
