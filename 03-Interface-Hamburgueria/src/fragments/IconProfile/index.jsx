import styles from './styles.module.css';
import { useUserContext } from '../../hooks/useUserContext';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

export const IconProfile = () => {
  const { userLogout, isUserLoggedIn, user } = useUserContext();
  const [menu, setMenu] = useState(false);

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
          {user.image && <img src={user.image} />}
        </div>

        <div className={`${styles.menu} ${menu ? styles.menuActive : ''}`}>
          <h3>{user.name}</h3>
          <button onClick={callLogout}>Sair</button>
        </div>
      </div>
    )
  );
};
