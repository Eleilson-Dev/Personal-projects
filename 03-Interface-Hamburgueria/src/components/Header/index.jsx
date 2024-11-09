import styles from './styles.module.css';

import { useUserContext } from '../../hooks/useUserContext';
import { IconCart } from '../../fragments/IconCart';
import { IconProfile } from '../../fragments/IconProfile';

export const Header = () => {
  const { user } = useUserContext();

  return (
    <header className={styles.headerContent}>
      <div className={`container ${styles.boxContent}`}>
        <div className={styles.title}>
          <h1>
            Burguer <strong className={styles.redColor}>Red</strong>
          </h1>
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
