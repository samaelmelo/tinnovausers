import * as yup from 'yup';

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

export { schema };
