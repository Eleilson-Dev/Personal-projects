import styles from './styles.module.scss';
import { Input } from '../../fragments/Input';
import { Button } from '../../fragments/Button';
import { useForm } from 'react-hook-form';

export const FormLogin = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const submitLoginUser = (userLoginData) => {
    console.log(userLoginData);
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
      <Input
        id="password"
        labelText="Senha"
        type="password"
        placeHolder="Digite aqui a sua senha..."
        register={register}
      />
      <Button type="submit" btnText="Entrar" />
    </form>
  );
};
