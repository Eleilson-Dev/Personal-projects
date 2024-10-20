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
    } catch (error) {
      console.log(error);
      console.log(error.response?.data.message);
      errorToast(error.response?.data.message);
      navigate('/');
      removeToken('@TOKEN');
      setUser(null);
    }
  }
};
