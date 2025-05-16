import React from "react";
import styles from "./style.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, disabled, ...props }) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : styles.enabled}`}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
