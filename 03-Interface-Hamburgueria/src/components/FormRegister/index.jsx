import styles from './styles.module.scss';
import { Input } from '../../fragments/Input';
import { Button } from '../../fragments/Button';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../hooks/useUserContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema } from '../../schemas/userRegisterSchema';

export const FormRegister = () => {
  const { userRegister } = useUserContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });

  const userSubmitData = (userCreateData) => {
    userRegister(userCreateData);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(userSubmitData)}>
      <Input
        id="name"
        labelText="Name"
        type="text"
        placeHolder="Digite aqui o seu Nome..."
        register={register}
      />
      {errors.name && <span>{errors.name.message}</span>}
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
      <Button type="submit" btnText="Enviar" />
    </form>
  );
};
