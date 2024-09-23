import styles from './styles.module.scss';
import { useUserContext } from '../../hooks/useUserContext';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalList } from './ModalList';
import { ModalFotter } from './ModalFotter';
import { Loading } from '../Loading';

export const Modal = () => {
  const { dataProps } = useUserContext();

  return (
    <div className={styles.boxModal}>
      <div className={styles.yourCart}>
        {dataProps.orderLoading && <Loading />}
        <div className={styles.cartTop}>
          <h2>Meu carrinho</h2>
          <span onClick={dataProps.toggleModal}>
            <IoCloseSharp />
          </span>
        </div>
        <div className={styles.cartList}>
          {dataProps.cartList.length === 0 ? (
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
