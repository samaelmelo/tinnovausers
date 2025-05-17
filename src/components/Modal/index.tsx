// src/components/Modal/Modal.tsx
import styles from './style.module.scss';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2>{title}</h2>}

        <div>{children}</div>
      </div>
    </div>
  );
};
