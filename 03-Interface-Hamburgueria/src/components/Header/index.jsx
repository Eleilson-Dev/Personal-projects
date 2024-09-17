import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.headerContent}>
      <div className={`container ${styles.boxContent}`}>
        <div className={styles.title}>
          <Link to="/">Hamburgueria</Link>
        </div>
        <div className={styles.links}>
          <Link to={'login'}>Login</Link>
          <Link to={'register'}>Register</Link>
        </div>
      </div>
    </header>
  );
};
