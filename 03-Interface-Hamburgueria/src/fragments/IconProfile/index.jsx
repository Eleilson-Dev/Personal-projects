import { useUserContext } from '../../hooks/useUserContext';
import styles from './styles.module.scss';
import { CgProfile } from 'react-icons/cg';

export const IconProfile = () => {
  const { userLogout, isUserLoggedIn } = useUserContext();
  return (
    !isUserLoggedIn && (
      <div onClick={userLogout} className={styles.iconProfile}>
        <CgProfile />
      </div>
    )
  );
};
