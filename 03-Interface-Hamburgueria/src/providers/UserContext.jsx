import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import { saveToken, getToken, removeToken } from '../utils/tokenActions';
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
  const [loading, setLoading] = useState(false);
  const [windowLoad, setWindowLoad] = useState(true);

  const [cartList, setCartList] = useState(() => {
    const saveItems = localStorage.getItem('@CARTLIST');
    return saveItems ? JSON.parse(saveItems) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCurrentUser(setUser, setLoading, navigate);
    loadProductData(setList, setWindowLoad);

    if (
      location.pathname !== '/validate/recover' &&
      location.pathname !== '/validate' &&
      location.pathname !== '/reset/password'
    ) {
      sessionStorage.clear();
    }

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
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setFormLoad(false);
    }
  };

  const userLogin = async (userLoginData) => {
    try {
      setWindowLoad(false);
      setFormLoad(true);
      const { data } = await api.post('/users/login', userLoginData);

      toast.success(`Login success`);
      navigate('/');
      saveToken('@TOKEN', data.accessToken);
    } catch (err) {
      navigate('/login');
      toast.error(err.response?.data.message);
    } finally {
      setFormLoad(false);
    }
  };

  const userRecover = async (formData) => {
    try {
      setFormLoad(true);
      const { data } = await api.post('/users/send/reset/code', formData);

      if (data?.userRecoverId) {
        sessionStorage.setItem('@PASS_RESET_EMAIL', data.userRecover.email);
        sessionStorage.setItem('@PASS_RESET_USER_ID', data.userRecoverId);
      }

      navigate('/validate/recover');
      toast.success('código de verificação enviado!');
    } catch (err) {
      console.log('error:', err);
      toast.error(err.response.data?.message);
    } finally {
      setFormLoad(false);
    }
  };

  const isUserLoggedIn = !getToken('@TOKEN');

  const userLogout = () => {
    try {
      setWindowLoad(true);
      setUser(null);
      removeToken('@TOKEN');
      setCartList([]);
      setList([]);
    } catch (error) {
      console.log(error);
    } finally {
      setWindowLoad(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const createProduct = async (productData) => {
    try {
      setFormLoad(true);
      const token = getToken('@TOKEN');

      await api.post('/lanches/create', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormLoad(false);
      toast.success('Produto adicionado na lista');
    } catch (err) {
      console.log(err);
      setFormLoad(false);
      toast.error(err.response?.data.message);
    }
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
        setList,
        pendingOrder,
        dataProps,
        formLoad,
        loading,
        windowLoad,
        setWindowLoad,
        setFormLoad,
        createProduct,
        userRecover,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
