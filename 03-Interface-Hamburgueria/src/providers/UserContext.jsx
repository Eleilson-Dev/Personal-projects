import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import { saveToken, getToken, removeToken } from '../utils/tokenActions';
import { errorToast, successToast } from '../utils/toasts';
import { loadProductData } from '../utils/loadProductsData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cartList, setCartList] = useState(() => {
    const saveItems = localStorage.getItem('@CARTLIST');
    return saveItems ? JSON.parse(saveItems) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser(setUser, navigate);
    loadProductData(setList);
    console.log(cartList);

    localStorage.setItem('@CARTLIST', JSON.stringify(cartList));
  }, [navigate, loadProductData, cartList]);

  const userRegister = async (userCreateData) => {
    try {
      await api.post('/users', userCreateData);
      navigate('/login');
    } catch (error) {
      errorToast(error.response?.data.message);
    }
  };

  const userLogin = async (userLoginData) => {
    try {
      const { data } = await api.post('/users/login', userLoginData);

      successToast(`Login success`);
      navigate('/');
      saveToken('@TOKEN', data.accessToken);
    } catch (err) {
      navigate('/login');
      errorToast(err.response?.data.message);
    }
  };

  const isUserLoggedIn = !getToken('@TOKEN');

  const userLogout = () => {
    setUser(null);
    removeToken('@TOKEN');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <UserContext.Provider
      value={{
        userRegister,
        userLogin,
        userLogout,
        isUserLoggedIn,
        user,
        isModalOpen,
        toggleModal,
        list,
        cartList,
        setCartList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
