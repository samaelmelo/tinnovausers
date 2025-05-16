import React from 'react';
import styles from './style.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error = false, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        {...props}
      />
    </div>
  );
};
