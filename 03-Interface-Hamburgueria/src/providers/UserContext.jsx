import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import { saveToken, getToken, removeToken } from '../utils/tokenActions';
import { errorToast, successToast } from '../utils/toasts';
import { loadProductData } from '../utils/loadProductsData';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [itemLoad, setItemLoad] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(false);
  const [order, setOrder] = useState(null);
  const [cancelOrderLoad, setCancelOrderLoad] = useState(false);
  const [formLoad, setFormLoad] = useState(false);

  const [cartList, setCartList] = useState(() => {
    const saveItems = localStorage.getItem('@CARTLIST');
    return saveItems ? JSON.parse(saveItems) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCurrentUser(setUser, navigate);
    loadProductData(setList);

    if (location.pathname !== '/validate') sessionStorage.clear();

    localStorage.setItem('@CARTLIST', JSON.stringify(cartList));
  }, [navigate, loadProductData, cartList]);

  const userRegister = async (userCreateData) => {
    try {
      setFormLoad(true);
      const { data } = await api.post('/users', userCreateData);

      if (data?.userId) {
        sessionStorage.setItem('@USERID', data.userId);
        sessionStorage.setItem('@USEREMAIL', data.user.email);
      }

      navigate('/validate');
      toast.success('código de verificação enviado!');
      setFormLoad(false);
    } catch (error) {
      setFormLoad(false);
      errorToast(error.response?.data.message);
    }
  };

  const userLogin = async (userLoginData) => {
    try {
      setFormLoad(true);
      const { data } = await api.post('/users/login', userLoginData);

      successToast(`Login success`);
      navigate('/');
      saveToken('@TOKEN', data.accessToken);
      setFormLoad(false);
    } catch (err) {
      setFormLoad(false);
      navigate('/login');
      errorToast(err.response?.data.message);
    }
  };

  const isUserLoggedIn = !getToken('@TOKEN');

  const userLogout = () => {
    setUser(null);
    removeToken('@TOKEN');
    setCartList([]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const dataProps = {
    cartList,
    toggleModal,
    setCartList,
    setOrderLoading,
    itemLoad,
    setItemLoad,
    orderLoading,
    setPendingOrder,
    cancelOrderLoad,
    setCancelOrderLoad,
    order,
    setOrder,
  };

  return (
    <UserContext.Provider
      value={{
        userRegister,
        userLogin,
        userLogout,
        isUserLoggedIn,
        user,
        setUser,
        isModalOpen,
        list,
        pendingOrder,
        dataProps,
        formLoad,
        setFormLoad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
