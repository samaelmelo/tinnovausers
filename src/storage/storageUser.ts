import type { UserDTO } from '../dtos/UserDTO';

export const storageUserSave = (user: UserDTO[]) => {
  localStorage.setItem('user-register', JSON.stringify(user));
};

export const storageGetUsers = (): UserDTO | null => {
  const user = localStorage.getItem('user-register');
  return user ? JSON.parse(user) as UserDTO : null;
};
