import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useUserContext } from '../../hooks/useUserContext';

import { IconCart } from '../../fragments/IconCart';
import { IconProfile } from '../../fragments/IconProfile';

export const Header = () => {
  const { isUserLoggedIn, user } = useUserContext();

  return (
    <header className={styles.headerContent}>
      <div className={`container ${styles.boxContent}`}>
        <div className={styles.title}>
          <Link to="/">
            Burguer <strong className={styles.redColor}>Red</strong>
          </Link>
        </div>
        <div className={styles.headerContentRigth}>
          {isUserLoggedIn && <Link to={'login'}>Login</Link>}
          {isUserLoggedIn && <Link to={'register'}>Register</Link>}

          {/* {!isUserLoggedIn && <span>{user?.name}</span>} */}

          <IconCart />
          <IconProfile />
        </div>
      </div>
    </header>
  );
};
