import styles from './styles.module.css';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRecoverSchema } from '../../schemas/userRegisterSchema';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { Input } from '../../fragments/Input';
import { TbShieldLock } from 'react-icons/tb';

export const Recovering = () => {
  const { formLoad, setFormLoad, windowLoad, userRecover } = useUserContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userRecoverSchema) });

  const submitForm = (formData) => {
    userRecover(formData);
    reset();
  };

  return (
    <div className={styles.centralize}>
      {windowLoad ? (
        <div className="windowLoad">
          <Loading />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.formContent}
        >
          {formLoad && <Loading />}
          <header>
            <div>
              <TbShieldLock />
            </div>
            <h1>Problemas Pra entrar ?</h1>
          </header>
          <p>
            Insira o seu email e enviaremos um código para você redefinir a sua
            senha.
          </p>
          <Input
            id="email"
            title="E-mail"
            type="email"
            placeholder="Insira o E-mail cadastrado"
            register={register}
            error={errors.email?.message}
          />
          <button type="submit">Enviar</button>
          <Link to="/">voltar para página de login ?</Link>
        </form>
      )}
    </div>
  );
};
