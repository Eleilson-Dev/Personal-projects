import styles from './styles.module.css';
import { shoppingCart } from '../../../utils/shoppingCart';
import { useUserContext } from '../../../hooks/useUserContext';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';
import { finalizeOrder } from '../../../utils/finalizeOrder';

export const ModalFotter = () => {
  const { setLoadingState, dataProps } = useUserContext();

  return (
    <div className={styles.modalFotter}>
      <div className={styles.contentBox}>
        <span>Total</span>
        <span>{convertToLocalMoney(shoppingCart(dataProps.cartList))}</span>
      </div>
      <div className={styles.contentBtns}>
        <a
          className={styles.finish}
          onClick={() => finalizeOrder(setLoadingState, dataProps)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Finalizar pedido</button>
        </a>

        <button
          onClick={() => dataProps.setCartList([])}
          className={styles.empty}
        >
          Esvaziar carrinho
        </button>
      </div>
    </div>
  );
};
