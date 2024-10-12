import styles from './styles.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { FcGoogle } from 'react-icons/fc';

export const LoginWithGoogle = () => {
  const { setFormLoad } = useUserContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;

      try {
        setFormLoad(true);
        const { data } = await api.post('/users/login/google', {
          access_token,
        });

        localStorage.setItem('@TOKEN', data.accessToken);

        toast.success('Google login success');
        setUser(data.userWithGoogle);
        navigate('/');
        setFormLoad(false);
      } catch (error) {
        console.error('Erro durante o login com Google:', error);
        toast.error('Google login error');
        setFormLoad(false);
      }
    },
    onError: (error) => {
      console.error('Erro na autenticação com o Google:', error);
      toast.error('Google login error');
    },
  });

  return (
    <div className={styles.content}>
      <div onClick={() => login()}>
        <FcGoogle size={30} />
        Continuar com o Google
      </div>
    </div>
  );
};
