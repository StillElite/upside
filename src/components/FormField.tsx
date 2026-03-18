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
    'w-full rounded-md border border-[#8ea3b5] bg-white px-3 text-sm text-[#1c2b3d] transition outline-none',
    'focus:border-[#305e88] focus:ring-1 focus:ring-[#305e88]',
    'disabled:cursor-not-allowed disabled:bg-[#eef3f7] disabled:text-[#6b7a8c]',
    !isTextarea && 'h-[38px]',
    isTextarea && 'min-h-[96px] py-2',
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
    <div className='space-y-1'>
      <label htmlFor={id} className='block text-sm font-medium text-[#38506a]'>
        {label}
      </label>

      {isTextarea ? (
        <textarea {...sharedProps} rows={4} />
      ) : (
        <input {...sharedProps} type={type} />
      )}

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
