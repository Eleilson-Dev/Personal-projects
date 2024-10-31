import styles from './styles.module.css';
import { useUserContext } from '../../hooks/useUserContext';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { userActions } from '../../utils/userActions';

export const IconProfile = () => {
  const {
    isUserLoggedIn,
    user,
    setUser,
    setLoadingState,
    setCartList,
    setOrder,
  } = useUserContext();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const callRedirect = (where) => {
    toggleMenu();
    navigate(where);
  };

  const callLogout = () => {
    setMenu(false);
    userActions.logout(setUser, setLoadingState, setCartList, setOrder);
  };

  return (
    !isUserLoggedIn && (
      <div className={styles.menuContent}>
        <div onClick={toggleMenu} className={styles.iconProfile}>
          <CgProfile />
          {user?.image && <img src={user.image} />}
        </div>

        <div className={`${styles.menu} ${menu ? styles.menuOpen : ''}`}>
          <div className={styles.menuTop}>
            <h3>{user.name}</h3>
            <button onClick={toggleMenu}>
              <IoCloseSharp />
            </button>
          </div>

          <div className={styles.menuBottom}>
            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => callRedirect('/create/hamburguer/product')}
                >
                  Cadastrar Hamburguer
                </button>
                <button onClick={() => callRedirect('/create/salgado/product')}>
                  Cadastrar Salgado
                </button>
                <button onClick={() => callRedirect('/create/pizza/product')}>
                  Cadastrar Pizza
                </button>
                <button
                  onClick={() => callRedirect('/create/refrigerante/product')}
                >
                  Cadastrar Refrigerante
                </button>
                <button onClick={() => callRedirect('/create/suco/product')}>
                  Cadastrar Suco
                </button>
                <button onClick={() => callRedirect('/create/bolo/product')}>
                  Cadastrar Bolo
                </button>
              </>
            )}
            <button onClick={callLogout}>Sair</button>
          </div>
        </div>
      </div>
    )
  );
};
