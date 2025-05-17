import styles from './style.module.scss';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { storageUserSave, storageGetUsers } from '../../storage/storageUser';
import type { UserDTO } from '../../dtos/UserDTO';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { schema } from './schema';
import { useNavigate } from 'react-router-dom';

type FormData = UserDTO;

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [isUserInList, setIsUserInList] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const users = (storageGetUsers() || []) as UserDTO[];

    const newUser = { ...data, id: uuidv4() };
    const updatedUsers = [...users, newUser];

    storageUserSave(updatedUsers);

    setTimeout(() => {
      setLoading(false);
      reset();
      toast.success('Usuário cadastrado com sucesso!');
      setIsUserInList(true);
    }, 3000);
  };

  useEffect(() => {
    const users = storageGetUsers();
    if (users && Array.isArray(users)) {
      setIsUserInList(true);
    }
  }, []);

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>TINNOVA</h1>
        <h2 className={styles.subtitle}>Cadastrar Usuário</h2>
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
          text="Cadastrar"
          type="submit"
          disabled={!isValid}
          isLoading={loading}
        />

        <Button
          text="Ver usuários cadastrados"
          type="button"
          variant="outline"
          disabled={!isUserInList}
          fullWidth={false}
          onClick={() => {
            navigate('/list');
          }}
        />
      </form>
    </main>
  );
};
