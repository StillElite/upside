import { clsx } from 'clsx';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  type?: 'text' | 'number';
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  disabled?: boolean;
  prefix?: string;
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  error,
  maxLength,
  type = 'text',
  placeholder,
  min,
  max,
  disabled = false,
  prefix,
}: FormFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = clsx(
    'w-full rounded-md border border-[#8ea3b5] bg-white px-3 text-sm text-[#1c2b3d] transition outline-none h-[38px]',
    'focus:border-[#305e88] focus:ring-1 focus:ring-[#305e88]',
    'disabled:cursor-not-allowed disabled:bg-[#eef3f7] disabled:text-[#6b7a8c]',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
  );

  const sharedProps = {
    id,
    value,
    onChange: handleChange,
    placeholder,
    disabled,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: inputClasses,
    ...(maxLength ? { maxLength } : {}),
    ...(type === 'number'
      ? {
          min,
          max,
        }
      : {}),
  };

  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='block text-sm font-medium text-[#38506a]'>
        {label}
      </label>

      <div className='relative'>
        {prefix && (
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7a8c] text-sm mt-[1px]'>
            {prefix}
          </span>
        )}

        <input
          {...sharedProps}
          type={type}
          className={clsx(inputClasses, prefix && 'pl-5')}
        />
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className='mt-1 text-xs text-red-600 transition-all duration-200 ease-in-out'
        >
          {error}
        </p>
      )}
    </div>
  );
};
