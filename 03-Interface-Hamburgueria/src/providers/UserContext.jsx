import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import { saveToken, getToken, removeToken } from '../utils/tokenActions';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearSessionStorage } from '../utils/clearSessionStorage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadToDelete, setloadToDelete] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [primaryMenu, setPrimaryMenu] = useState([]);

  const [loadingState, setLoadingState] = useState({
    orderLoading: false,
    formLoad: false,
    pendigOrderLoad: false,
    windowLoad: false,
  });

  const [cartList, setCartList] = useState(() => {
    const saveItems = localStorage.getItem('@CARTLIST');
    return saveItems ? JSON.parse(saveItems) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCurrentUser(setUser, setLoading, navigate);

    clearSessionStorage(location);

    localStorage.setItem('@CARTLIST', JSON.stringify(cartList));
  }, [navigate, cartList]);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const createProduct = async (productData) => {
    try {
      setList([]);
      setLoadingState((prev) => ({ ...prev, formLoad: true }));
      const token = getToken('@TOKEN');

      await api.post('/hamburguers/create', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Produto adicionado na lista');
      navigate('/menu/hamburguers');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      setLoadingState((prev) => ({ ...prev, formLoad: false }));
    }
  };

  const dataProps = {
    cartList,
    toggleModal,
    setCartList,
    loadToDelete,
    setloadToDelete,
    setPendingOrder,
    order,
    setOrder,
  };

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        user,
        setUser,
        isModalOpen,
        pendingOrder,
        dataProps,
        loading,
        createProduct,
        userRecover,
        loadingState,
        setLoadingState,
        primaryMenu,
        setPrimaryMenu,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
