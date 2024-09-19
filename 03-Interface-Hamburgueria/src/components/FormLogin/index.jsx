import styles from './styles.module.scss';
import { Input } from '../../fragments/Input';
import { Button } from '../../fragments/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '../../schemas/userRegisterSchema';
import { useUserContext } from '../../hooks/useUserContext';

export const FormLogin = () => {
  const { userLogin } = useUserContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const submitLoginUser = (userLoginData) => {
    userLogin(userLoginData);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitLoginUser)}>
      <Input
        id="email"
        labelText="E-mail"
        type="email"
        placeHolder="Digite aqui o seu email..."
        register={register}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <Input
        id="password"
        labelText="Senha"
        type="password"
        placeHolder="Digite aqui a sua senha..."
        register={register}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <Button type="submit" btnText="Entrar" />
    </form>
  );
};
