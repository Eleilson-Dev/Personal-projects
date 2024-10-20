import styles from './styles.module.css';

import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '../../schemas/userRegisterSchema';
import { LoginWithGoogle } from '../../components/LoginWithGoggle';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { InputPass } from '../../fragments/InputPass';
import { Input } from '../../fragments/Input';
import { userActions } from '../../utils/userActions';

export const Login = () => {
  const { loadingState, setLoadingState, setPrimaryMenu } = useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const submitForm = (userLoginData) => {
    userActions.login(userLoginData, setLoadingState, setPrimaryMenu, navigate);
    reset();
  };

  return (
    <div className={styles.centralize}>
      {loadingState.windowLoad ? (
        <div className="windowLoad">
          <Loading />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.formContent}
        >
          {loadingState.formLoad && <Loading />}
          <header>
            <h1>Bem-vindo</h1>
            <Link to="/register">Cadastre-se</Link>
          </header>
          <Input
            id="email"
            title="E-mail"
            type="email"
            placeholder="Digite seu E-mail"
            register={register}
          />
          <InputPass register={register} />
          <button>Entrar</button>
          <div className={styles.withGoogle}>
            <FcGoogle />
            Continuar com o Google
            <LoginWithGoogle />
          </div>
          <Link to="/recovering">Esqueceu a senha ?</Link>
        </form>
      )}
    </div>
  );
};
