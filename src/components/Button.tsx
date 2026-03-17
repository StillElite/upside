import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon-only';
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
    'inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#305e88]';
  const classes = clsx(
    baseClasses,

    variant === 'primary' &&
      'px-4 py-2 rounded-md shadow-md bg-[#305e88] text-white hover:bg-[#274f72] transition-colors',

    variant === 'secondary' &&
      'px-4 py-2 rounded-md border border-[#305e88] bg-white text-[#305e88] hover:bg-[#305e88]/10 transition-colors',

    variant === 'destructive' && 'text-red-600 hover:underline',

    variant === 'icon-only' && '',

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
