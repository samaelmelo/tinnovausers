import React from 'react';
import styles from './style.module.scss';
import { Loading } from '../Loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  disabled = false,
  fullWidth = true,
  variant,
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;
  const variantClass =
    variant === 'outline'
      ? styles.outline
      : variant === 'secondary'
      ? styles.secondary
      : '';
  const widthClass = fullWidth ? styles.fullWidth : styles.defaultWidth;

  return (
    <button
      className={`${styles.button} ${variantClass} ${widthClass} ${
        isLoading ? styles.loading : disabled ? styles.disabled : styles.enabled
      }`}
      disabled={isButtonDisabled}
      {...props}
    >
      {isLoading ? <Loading /> : text}
    </button>
  );
};
