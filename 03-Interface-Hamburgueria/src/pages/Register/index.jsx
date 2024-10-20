import styles from './styles.module.css';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema } from '../../schemas/userRegisterSchema';
import { LoginWithGoogle } from '../../components/LoginWithGoggle';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { Input } from '../../fragments/Input';
import { InputPass } from '../../fragments/InputPass';
import { userActions } from '../../utils/userActions';

export const Register = () => {
  const { loadingState, setLoadingState } = useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });

  const submitForm = async (userCreateData) => {
    await userActions.register(userCreateData, setLoadingState, navigate);

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
            <h1>Cadastre-se</h1>
            <Link to="/">Entrar</Link>
          </header>

          <Input
            id="name"
            title="Nome"
            type="text"
            placeholder="Digite seu nome"
            register={register}
          />
          <Input
            id="email"
            type="email"
            title="E-mail"
            placeholder="Digite seu email"
            register={register}
          />
          <InputPass register={register} />
          <button>Enviar</button>
          <div className={styles.withGoogle}>
            <FcGoogle />
            Continuar com o Google
            <LoginWithGoogle />
          </div>
        </form>
      )}
    </div>
  );
};
