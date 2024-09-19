import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useUserContext } from '../../hooks/useUserContext';

export const Header = () => {
  const { userLogout, userIsLoged, user } = useUserContext();

  return (
    <header className={styles.headerContent}>
      <div className={`container ${styles.boxContent}`}>
        <div className={styles.title}>
          <Link to="/">Hamburgueria</Link>
        </div>
        <div className={styles.links}>
          {userIsLoged && <Link to={'login'}>Login</Link>}
          {userIsLoged && <Link to={'register'}>Register</Link>}

          {!userIsLoged && <span>Hello {user?.name}</span>}
          {!userIsLoged && <a onClick={userLogout}>Sair</a>}
        </div>
      </div>
    </header>
  );
};
