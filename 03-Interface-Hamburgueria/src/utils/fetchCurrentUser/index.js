import { api } from '../../services/api';
import { errorToast } from '../toasts';
import { getToken, removeToken } from '../tokenActions';

export const fetchCurrentUser = async (setUser, navigate) => {
  const token = getToken('@TOKEN');

  if (token) {
    try {
      const { data } = await api.get(`/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      navigate('/');
    } catch (error) {
      errorToast(error.response?.data.message);
      navigate('/login');
      removeToken('@TOKEN');
      setUser(null);
    }
  }
};
