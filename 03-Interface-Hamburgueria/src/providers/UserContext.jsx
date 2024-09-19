import { createContext, useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const userRegister = async (userCreateData) => {
    try {
      await api.post('/users', userCreateData);
      navigate('/login');
    } catch (error) {
      console.error(
        'Erro ao registrar usuário:',
        error.response?.data || error.message
      );
    }
  };

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('@TOKEN');

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
        navigate('/login');
        console.log(error);
        localStorage.removeItem('@TOKEN');
        setUser(null);
      }
    }
  }, [navigate]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const userLogin = async (userLoginData) => {
    try {
      const { data } = await api.post('/users/login', userLoginData);
      setUser(data.user);
      setAccessToken(data.accessToken);
      navigate('/');
      localStorage.setItem('@TOKEN', data.accessToken);
    } catch (err) {
      navigate('/login');
      console.error(
        'Erro ao registrar usuário:',
        err.response?.data || err.message
      );
    }
  };

  const userIsLoged = !localStorage.getItem('@TOKEN');

  const userLogout = () => {
    setUser(null);
    setAccessToken(null);

    localStorage.removeItem('@USERID');
    localStorage.removeItem('@TOKEN');
  };

  return (
    <UserContext.Provider
      value={{ userRegister, userLogin, userLogout, userIsLoged, user }}
    >
      {children}
    </UserContext.Provider>
  );
};
