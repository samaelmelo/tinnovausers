import React from 'react';
import styles from './style.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  disabled = false,
  fullWidth = true,
  variant,
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;
  const variantClass = variant === 'outline' ? styles.outline : variant === 'secondary' ? styles.secondary : '';
  const widthClass = fullWidth ? styles.fullWidth : styles.defaultWidth;

  return (
    <button
      className={`${styles.button} ${variantClass} ${widthClass} ${
        isLoading ? styles.loading : disabled ? styles.disabled : styles.enabled
      }`}
      disabled={isButtonDisabled}
      {...props}
    >
      {isLoading ? <span className={styles.spinner} /> : text}
    </button>
  );
};

export default Button;
