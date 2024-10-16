import styles from './styles.module.css';
import { useUserContext } from '../../hooks/useUserContext';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';

export const IconProfile = () => {
  const { userLogout, isUserLoggedIn, user } = useUserContext();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const callLogout = () => {
    setMenu(false);
    userLogout();
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
            {user?.role === 'ADMIN' && (
              <button onClick={() => navigate('/create/product')}>
                Cadastrar produto
              </button>
            )}
            <button onClick={callLogout}>Sair</button>
          </div>
        </div>
      </div>
    )
  );
};
