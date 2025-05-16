import styles from './style.module.scss';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Esquema de validação com Yup
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

type FormData = yup.InferType<typeof schema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('Dados válidos:', data);
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Nome completo"
          placeholder="John Doe"
          {...register('name')}
          error={!!errors.name}
        />
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          {...register('cpf')}
          error={!!errors.cpf}
        />
        <Input
          label="Telefone"
          placeholder="DDD 99999-9999"
          {...register('phone')}
          error={!!errors.phone}
        />
        <Input
          label="Email"
          placeholder="email@email.com"
          {...register('email')}
          error={!!errors.email}
        />

        <Button text="Cadastrar" type="submit" disabled={!isValid} />
      </form>
    </main>
  );
};
