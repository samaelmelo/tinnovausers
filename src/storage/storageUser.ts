import type { UserDTO } from '../dtos/UserDTO';

export const storageUserSave = (user: UserDTO[] | null) => {
  localStorage.setItem('user-register', JSON.stringify(user));
};

export const storageGetUsers = (): UserDTO | null => {
  const user = localStorage.getItem('user-register');
  return user ? (JSON.parse(user) as UserDTO) : null;
};

export const storageDeleteUser = (cpf: string) => {
  const usersJson = localStorage.getItem('user-register');
  const users = JSON.parse(usersJson as string);

  const filteredUsers = users.filter((user: UserDTO) => user.cpf !== cpf);

  if (filteredUsers.length === 0) {
    storageUserSave(null);
  } else {
    storageUserSave(filteredUsers);
  }
};

export const markInitialLoad = () =>
  localStorage.setItem('users_loaded', 'true');
export const hasInitialLoad = () =>
  localStorage.getItem('users_loaded') === 'true';
