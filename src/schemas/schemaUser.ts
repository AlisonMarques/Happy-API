import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export default schema;
