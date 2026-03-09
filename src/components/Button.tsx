import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
  className,
  text,
  icon,
  iconPosition = 'left',
  type = 'button',
  ...rest
}: ButtonProps) => {
  const baseClasses = 'flex items-center gap-1 px-4 py-2 rounded-md shadow-md';
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

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
