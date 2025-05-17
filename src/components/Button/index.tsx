import React from "react"
import styles from "./style.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, isLoading = false, disabled = false, ...props }) => {
  const isButtonDisabled = disabled || isLoading

  return (
    <button
      className={`${styles.button} ${
        isLoading
          ? styles.loading
          : disabled
          ? styles.disabled
          : styles.enabled
      }`}
      disabled={isButtonDisabled}
      {...props}
    >
      {isLoading ? <span className={styles.spinner} /> : text}
    </button>
  )
}

export default Button
