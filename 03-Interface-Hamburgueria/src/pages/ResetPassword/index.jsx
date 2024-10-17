import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../../schemas/userRegisterSchema';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { Input } from '../../fragments/Input';
import { AiFillUnlock } from 'react-icons/ai';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const { formLoad, setFormLoad, windowLoad, userRecover } = useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const submitForm = async (formData) => {
    try {
      setFormLoad(true);
      const recoveryToken = sessionStorage.getItem('@TOKEN_RECOVERY');

      await api.post(
        '/users/reset/password',
        { password: formData.new_pass },
        {
          headers: { Authorization: `Bearer ${recoveryToken}` },
        }
      );

      toast.success('Sua senha foi atualizada');
    } catch (err) {
      console.log(err);
      toast.error('Erro ao tentar atualizar a senha');
    } finally {
      setFormLoad(false);
      navigate('/login');
      reset();
    }
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
              <AiFillUnlock />
            </div>
            <h1>Defina Sua Nova Senha</h1>
          </header>
          <Input
            id="new_pass"
            title="Senha"
            type="text"
            placeholder="Insira sua nova senha"
            register={register}
            error={errors.new_pass?.message}
          />
          <Input
            id="confirm_new_pass"
            title="Confirmar Senha"
            type="text"
            placeholder="Confirme sua nova senha"
            register={register}
            error={errors.confirm_new_pass?.message}
          />
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
};
