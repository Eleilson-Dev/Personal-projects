import { useUserContext } from '../../hooks/useUserContext';
import styles from './styles.module.scss';
import { FaShoppingCart } from 'react-icons/fa';

export const IconCart = () => {
  const { isUserLoggedIn, dataProps } = useUserContext();

  return (
    !isUserLoggedIn && (
      <div onClick={dataProps.toggleModal} className={styles.iconCart}>
        <FaShoppingCart />
        <div className={styles.counter}>{dataProps.cartList.length}</div>
      </div>
    )
  );
};
