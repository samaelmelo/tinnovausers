import React from 'react';
import styles from './style.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error = false,
  errorMessage,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        {...props}
      />
      <span className={styles.error}>{error && errorMessage}</span>
    </div>
  );
};
