import styles from './styles.module.scss';
import { shoppingCart } from '../../../utils/shoppingCart';
import { useUserContext } from '../../../hooks/useUserContext';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';
import { finalizeOrder } from '../../../utils/finalizeOrder';

export const ModalFotter = () => {
  const { cartList, setCartList, setOrderLoading } = useUserContext();

  return (
    <div className={styles.modalFotter}>
      <div className={styles.contentBox}>
        <span>Total</span>
        <span>{convertToLocalMoney(shoppingCart(cartList))}</span>
      </div>
      <div className={styles.contentBtns}>
        <button
          onClick={() => finalizeOrder(cartList, setCartList, setOrderLoading)}
          className={styles.finish}
        >
          Finalizar pedido
        </button>
        <button onClick={() => setCartList([])} className={styles.empty}>
          Esvaziar carrinho
        </button>
      </div>
    </div>
  );
};
