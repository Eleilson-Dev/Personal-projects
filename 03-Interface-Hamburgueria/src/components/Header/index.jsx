import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { IconCart } from '../../fragments/IconCart';
import { IconProfile } from '../../fragments/IconProfile';
import { useLists } from '../../hooks/useLists';

export const Header = () => {
  const { user } = useUserContext();
  const { setBurgersList } = useLists();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== '/') {
      setBurgersList([]);
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
          {user?.role === 'admin' && <span>ADM</span>}
          <IconCart />
          <IconProfile />
        </div>
      </div>
    </header>
  );
};
