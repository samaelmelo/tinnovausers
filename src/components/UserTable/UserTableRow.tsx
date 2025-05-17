import type { UserDTO } from '../../dtos/UserDTO';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import styles from './style.module.scss';

interface Props {
  user: UserDTO;
  onEdit: (cpf: string) => void;
  onDelete: (cpf: string) => void;
}

export const UserTableRow = ({ user, onEdit, onDelete }: Props) => {
  return (
    <tr>
      <td data-label="Nome">{user.name}</td>
      <td data-label="CPF">{user.cpf}</td>
      <td data-label="Telefone">{user.phone}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Ações">
        <button
          className={styles.edit}
          aria-label="Editar usuário"
          onClick={() => user.cpf && onEdit(user.cpf)}
        >
          <FiEdit />
        </button>
        <button
          className={styles.delete}
          aria-label="Excluir usuário"
          onClick={() => user.cpf && onDelete(user.cpf)}
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};
