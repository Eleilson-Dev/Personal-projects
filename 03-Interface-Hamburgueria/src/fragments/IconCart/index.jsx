import styles from './styles.module.css';
import { useUserContext } from '../../hooks/useUserContext';
import { FaShoppingCart } from 'react-icons/fa';

export const IconCart = () => {
  const { isUserLoggedIn, toggleModal, cartList } = useUserContext();

  return (
    !isUserLoggedIn && (
      <div onClick={toggleModal} className={styles.iconCart}>
        <FaShoppingCart />
        <div className={styles.counter}>{cartList.length}</div>
      </div>
    )
  );
};
