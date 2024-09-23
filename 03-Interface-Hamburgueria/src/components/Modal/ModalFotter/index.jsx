import styles from './styles.module.scss';
import { shoppingCart } from '../../../utils/shoppingCart';
import { useUserContext } from '../../../hooks/useUserContext';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';
import { finalizeOrder } from '../../../utils/finalizeOrder';

export const ModalFotter = () => {
  const { dataProps } = useUserContext();

  return (
    <div className={styles.modalFotter}>
      <div className={styles.contentBox}>
        <span>Total</span>
        <span>{convertToLocalMoney(shoppingCart(dataProps.cartList))}</span>
      </div>
      <div className={styles.contentBtns}>
        <a
          className={styles.finish}
          onClick={() => finalizeOrder(dataProps)}
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
