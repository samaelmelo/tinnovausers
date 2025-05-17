import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import {
  storageGetUsers,
  storageDeleteUser,
  storageUserSave,
} from '../../storage/storageUser';
import type { UserDTO } from '../../dtos/UserDTO';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { Modal } from '../../components/Modal';
import { UserTable } from '../../components/UserTable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../Register/schema';
import { IoCloseOutline } from 'react-icons/io5';
import { Input } from '../../components/Input';
import { api } from '../../service/api';

export const List = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [selectedCPF, setSelectedCPF] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenModalDelete = (cpf: string) => {
    setIsDeleteOpen(true);

    const userFiltered = users.find((user) => user.cpf === cpf);
    if (userFiltered?.cpf) setSelectedCPF(userFiltered.cpf);
  };

  const markInitialLoad = () => localStorage.setItem('users_loaded', 'true');
  const hasInitialLoad = () => localStorage.getItem('users_loaded') === 'true';

  const handleDeleteConfirm = () => {
    storageDeleteUser(selectedCPF as string);
    setIsLoading(true);

    setTimeout(() => {
      toast.success('Usuário removido com sucesso!');
      setIsLoading(false);
      setIsDeleteOpen(false);
      loadUsers();
    }, 3000);
  };

  const loadUsers = async () => {
    const localData = storageGetUsers() || [];

    if (!hasInitialLoad()) {
      try {
        const response = await fetch(`${api}/users`);
        const apiData = await response.json();

        const apiUsers = Array.isArray(apiData) ? apiData : [];
        const localUsers = Array.isArray(localData) ? localData : [];

        const merged = [...apiUsers, ...localUsers];

        storageUserSave(merged);
        markInitialLoad();
        setUsers(merged);
        toast.success('Usuários carregados da API com sucesso!');
        return;
      } catch (err) {
        toast.error('Erro ao carregar usuários da API');
        console.error(err);
      }
    }

    if (Array.isArray(localData)) {
      setUsers(localData);
    } else {
      setUsers([]);
    }
  };

  type FormData = UserDTO;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleEdit = (cpf: string) => {
    const userFiltered = users.find((item) => item.cpf === cpf);
    if (!userFiltered) return;

    setUser(userFiltered);
    setValue('cpf', userFiltered.cpf);
    setValue('email', userFiltered.email);
    setValue('name', userFiltered.name);
    setValue('phone', userFiltered.phone);
    setIsEditOpen(true);
  };

  const onEdit = (data: FormData) => {
    const updateUser = {
      ...data,
      cpf: user.cpf,
    };

    setIsLoading(true);

    const updatedUsers = users.map((item) =>
      item.cpf === updateUser.cpf ? updateUser : item,
    );
    storageUserSave(updatedUsers);

    setTimeout(() => {
      toast.success('Usuário atualizado com sucesso!');
      setIsLoading(false);
      setIsEditOpen(false);
      reset();
      loadUsers();
    }, 3000);
  };

  const closeModal = () => {
    reset();
    setIsEditOpen(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <h1 className={styles.title}>Usuários Cadastrados</h1>

        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleOpenModalDelete}
        />

        <Button
          fullWidth={false}
          text="Cadastrar novo usuário"
          variant="outline"
          onClick={() => navigate('/')}
        />
      </section>

      <Modal isOpen={isDeleteOpen} title="Confirmar exclusão">
        <p className={styles.questionDelete}>
          Deseja realmente excluir este usuário?
        </p>
        <div className={styles.containerBtns}>
          <Button
            text="Não"
            variant="secondary"
            onClick={() => setIsDeleteOpen(false)}
          />
          <Button
            text="Confirmar"
            onClick={handleDeleteConfirm}
            isLoading={isLoading}
          />
        </div>
      </Modal>

      <Modal isOpen={isEditOpen} title="">
        <form onSubmit={handleSubmit(onEdit)} className={styles.form}>
          <button
            type="button"
            aria-label="fechar"
            className={styles.btnClose}
            onClick={closeModal}
          >
            <IoCloseOutline className={styles.iconClose} />
          </button>
          <h1 className={styles.title}>TINNOVA</h1>
          <h2 className={styles.subtitle}>Editar usuário</h2>
          <Input
            label="Nome completo"
            placeholder="John Doe"
            {...register('name')}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            label="Email"
            placeholder="email@email.com"
            {...register('email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            label="CPF"
            placeholder="000.000.000-00"
            {...register('cpf')}
            error={!!errors.cpf}
            errorMessage={errors.cpf?.message}
          />
          <Input
            label="Telefone"
            placeholder="DDD 99999-9999"
            {...register('phone')}
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
          />

          <Button
            text="Atualizar"
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
          />
        </form>
      </Modal>
    </main>
  );
};
