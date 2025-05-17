import styles from './style.module.scss';
import type { UserDTO } from '../../dtos/UserDTO';
import { UserTableRow } from './UserTableRow';

interface UserTableProps {
  users: UserDTO[];
  onEdit: (cpf: string) => void;
  onDelete: (cpf: string) => void;
}

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        {users.length !== 0 && (
          <tbody>
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        )}
      </table>
      {users.length === 0 && (
        <p className={styles.noData}>Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
};
