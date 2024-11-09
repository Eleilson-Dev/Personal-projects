import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/fetchCurrentUser';
import { getToken } from '../utils/tokenActions';
import { useLocation } from 'react-router-dom';
import { clearSessionStorage } from '../utils/clearSessionStorage';
import { api } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [windowLoad, setWindowLoad] = useState(false);

  const [loadingState, setLoadingState] = useState({
    orderLoading: false,
    formLoad: false,
    pendigOrderLoad: false,
    windowLoad: false,
    loadToDelete: null,
  });

  const [cartList, setCartList] = useState(() => {
    const saveItems = localStorage.getItem('@CARTLIST');
    return saveItems ? JSON.parse(saveItems) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await api.get('/categories');

      setCategories(data);
    };

    loadCategories();

    fetchCurrentUser(setUser, setLoading, navigate);

    clearSessionStorage(location);

    localStorage.setItem('@CARTLIST', JSON.stringify(cartList));
  }, [navigate, cartList]);

  const isUserLoggedIn = !getToken('@TOKEN');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        user,
        setUser,
        isModalOpen,
        pendingOrder,
        toggleModal,
        cartList,
        setCartList,
        loading,
        loadingState,
        setLoadingState,
        setPendingOrder,
        setOrder,
        order,
        categories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
