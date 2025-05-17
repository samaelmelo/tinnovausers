import styles from './style.module.scss';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { storageUserSave, storageGetUsers } from '../../storage/storageUser';
import type { UserDTO } from '../../dtos/UserDTO';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  cpf: yup
    .string()
    .required('CPF obrigatório')
    .matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido'),
  phone: yup
    .string()
    .required('Telefone obrigatório')
    .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
});

type FormData = UserDTO;

export const Register = () => {
  const [loading, setLoading] = useState(false);

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

    const users = storageGetUsers();

    if (!users) {
      storageUserSave([{ ...data, id: uuidv4() }]);
      setTimeout(() => {
        setLoading(false);
        reset();
        toast.success('Usuário cadastrado com sucesso! ✅');
      }, 4000);
      return;
    }
    const usersArray = Array.isArray(users) ? users : [users];
    const dt = [...usersArray, { ...data, id: uuidv4() }];

    storageUserSave(dt);

    setTimeout(() => {
      setLoading(false);
      reset();
      toast.success('Usuário cadastrado com sucesso! ✅');
    }, 4000);
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Nome completo"
          placeholder="John Doe"
          {...register('name')}
          error={!!errors.name}
          errorMessage={errors.name?.message}
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
        <Input
          label="Email"
          placeholder="email@email.com"
          {...register('email')}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Button
          text="Cadastrar"
          type="submit"
          disabled={!isValid}
          isLoading={loading}
        />
      </form>
    </main>
  );
};
