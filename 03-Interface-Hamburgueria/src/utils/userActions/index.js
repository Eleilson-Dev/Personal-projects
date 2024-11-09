import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { removeToken, saveToken } from '../tokenActions';

export const userActions = {
  register: async (userCreateData, setLoadingState, navigate) => {
    try {
      setLoadingState((prev) => ({ ...prev, formLoad: true }));
      const { data } = await api.post('/users', userCreateData);

      if (data?.userId) {
        sessionStorage.setItem('@USERID', data.userId);
        sessionStorage.setItem('@USEREMAIL', data.user.email);
      }
      navigate('/validate');
      toast.success('Código de verificação enviado!');
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setLoadingState((prev) => ({ ...prev, formLoad: false }));
    }
  },

  login: async (userLoginData, setLoadingState, navigate) => {
    try {
      setLoadingState((prev) => ({
        ...prev,
        formLoad: true,
        windowLoad: false,
      }));
      const { data } = await api.post('/users/login', userLoginData);
      toast.success('Login realizado com sucesso');
      navigate('/menu/hamburguers');
      saveToken('@TOKEN', data.accessToken);
    } catch (err) {
      navigate('/');
      toast.error(err.response?.data.message);
    } finally {
      setLoadingState((prev) => ({ ...prev, formLoad: false }));
    }
  },

  logout: (setUser, setLoadingState, setCartList, setOrder) => {
    try {
      setLoadingState((prev) => ({ ...prev, windowLoad: true }));
      setUser(null);
      removeToken('@TOKEN');
      setCartList([]);
      setOrder(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState((prev) => ({ ...prev, windowLoad: false }));
    }
  },

  recoverPassword: async (formData, setLoadingState, navigate) => {
    try {
      setLoadingState((prev) => ({ ...prev, formLoad: true }));
      const { data } = await api.post('/users/send/reset/code', formData);
      if (data?.userRecoverId) {
        sessionStorage.setItem('@PASS_RESET_EMAIL', data.userRecover.email);
        sessionStorage.setItem('@PASS_RESET_USER_ID', data.userRecoverId);
      }
      navigate('/validate/recover');
      toast.success('Código de verificação enviado!');
    } catch (err) {
      toast.error(err.response?.data.message);
    } finally {
      setLoadingState((prev) => ({ ...prev, formLoad: false }));
    }
  },
};
