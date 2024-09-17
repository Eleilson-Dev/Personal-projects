import { createContext } from 'react';
import { api } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userRegister = async (userCreateData) => {
    try {
      const response = await api.post('/users', userCreateData);
      console.log('Usuário registrado com sucesso:', response.data);
    } catch (error) {
      console.error(
        'Erro ao registrar usuário:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <UserContext.Provider value={{ userRegister }}>
      {children}
    </UserContext.Provider>
  );
};
