import styles from './styles.module.css';

import { useGoogleLogin } from '@react-oauth/google';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { useLists } from '../../hooks/useLists';

export const LoginWithGoogle = () => {
  const { setLoadingState, setUser } = useUserContext();
  const { setBurgersList } = useLists();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;

      try {
        setBurgersList([]);
        setLoadingState((prev) => ({ ...prev, formLoad: true }));

        const { data } = await api.post('/users/login/google', {
          access_token,
        });

        localStorage.setItem('@TOKEN', data.accessToken);

        toast.success('Google login success');
        setUser(data.userWithGoogle);
        navigate('/');
      } catch (error) {
        console.error('Erro durante o login com Google:', error);
        toast.error('Google login error');
      } finally {
        setLoadingState((prev) => ({ ...prev, formLoad: false }));
      }
    },
    onError: (error) => {
      console.error('Erro na autenticação com o Google:', error);
      toast.error('Google login error');
    },
  });

  return <div className={styles.boxContent} onClick={login}></div>;
};
