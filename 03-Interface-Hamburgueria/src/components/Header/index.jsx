import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { IconCart } from '../../fragments/IconCart';
import { IconProfile } from '../../fragments/IconProfile';

export const Header = () => {
  const { user, setPrimaryMenu } = useUserContext();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== '/') {
      setPrimaryMenu([]);
    }

    return;
  };

  return (
    <header className={styles.headerContent}>
      <div className={`container ${styles.boxContent}`}>
        <div className={styles.title}>
          <Link to="/" onClick={handleClick}>
            Burguer <strong className={styles.redColor}>Red</strong>
          </Link>
        </div>
        <div className={styles.headerContentRigth}>
          <Link to="/menu/hamburguers">Hamburguers</Link>
          <Link to="/menu/refrigerantes">Refrigerantes</Link>
          {user?.role === 'admin' && <span>ADM</span>}
          <IconCart />
          <IconProfile />
        </div>
      </div>
    </header>
  );
};
