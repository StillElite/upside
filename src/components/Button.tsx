import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  className,
  text,
  icon,
  iconPosition = 'left',
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const baseClasses =
    'flex items-center gap-1 px-4 py-2 rounded-md shadow-md justify-center';
  const classes = clsx(
    baseClasses,
    variant === 'primary' && 'bg-[#305e88] text-white',
    variant === 'secondary' && 'border border-[#305e88] text-[#305e88]',
    className,
  );

  return (
    <button className={classes} type={type} {...rest}>
      {icon && iconPosition === 'left' && (
        <FontAwesomeIcon icon={icon} aria-hidden='true' />
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <FontAwesomeIcon icon={icon} aria-hidden='true' />
      )}
    </button>
  );
};
