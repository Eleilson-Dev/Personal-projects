import styles from './styles.module.scss';
import { useUserContext } from '../../hooks/useUserContext';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalList } from './ModalList';
import { ModalFotter } from './ModalFotter';
import { ModalLoading } from './ModalLoading';

export const Modal = () => {
  const { toggleModal, cartList, orderLoading } = useUserContext();
  return (
    <div className={styles.boxModal}>
      <div className={styles.yourCart}>
        {orderLoading && <ModalLoading />}
        <div className={styles.cartTop}>
          <h2>Meu carrinho</h2>
          <span onClick={toggleModal}>
            <IoCloseSharp />
          </span>
        </div>
        <div className={styles.cartList}>
          {cartList.length === 0 ? (
            <h3>Você ainda não possui nenhum pedido no carrinho!</h3>
          ) : (
            <>
              <ModalList />
              <ModalFotter />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
