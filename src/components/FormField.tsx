import { clsx } from 'clsx';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'textarea' | 'date' | 'number';
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  disabled?: boolean;
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  error,
  maxLength,
  minLength,
  type = 'text',
  placeholder,
  min,
  max,
  disabled = false,
}: FormFieldProps) => {
  const isTextarea = type === 'textarea';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e.target.value);
  };

  const inputClasses = clsx(
    'w-full h-10 rounded-md border bg-white px-2 py-2  text-[#1c2b3d] shadow-sm outline-none transition',
    'border-[#8ea3b5] focus:border-[#305e88] focus:ring-2 focus:ring-[#305e88] focus:ring-offset-2 focus:ring-offset-white',
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
    ...(type === 'date'
      ? {
          max: max || new Date().toISOString().split('T')[0],
          min,
        }
      : {}),
    ...(type === 'number'
      ? {
          min,
          max,
        }
      : {}),
    ...(type !== 'number' && minLength ? { minLength } : {}),
  };

  return (
    <>
      <label htmlFor={id} className='block text-sm font-medium text-[#38506a]'>
        {label}
      </label>

      {isTextarea ? (
        <textarea {...sharedProps} rows={4} />
      ) : (
        <input {...sharedProps} type={type} />
      )}

      <div className='mt-1 flex justify-between text-xs'>
        {error ? (
          <p id={`${id}-error`} className='text-red-600'>
            {error}
          </p>
        ) : (
          <span />
        )}

        {maxLength && type !== 'number' && typeof value === 'string' ? (
          <p className='text-[#6b7a8c]'>
            {value.length}/{maxLength}
          </p>
        ) : null}
      </div>
    </>
  );
};
