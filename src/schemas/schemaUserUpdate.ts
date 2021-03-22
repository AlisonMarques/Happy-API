import * as Yup from 'yup';

const schemaUpdate = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string().min(6),
  password: Yup.string()
    .min(6)
    .when('oldPassword', (oldPassword: string, field: any) =>
      oldPassword ? field.required() : field
    ),
  confirmPassword: Yup.string().when(
    'password',
    (password: string, field: any) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});

export default schemaUpdate;
