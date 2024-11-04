import styles from './styles.module.css';

import { shoppingCart } from '../../../utils/shoppingCart';
import { useUserContext } from '../../../hooks/useUserContext';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';
import { finalizeOrder } from '../../../utils/finalizeOrder';

export const ModalFotter = () => {
  const {
    setLoadingState,
    cartList,
    setCartList,
    setPendingOrder,
    setOrder,
    toggleModal,
  } = useUserContext();

  return (
    <div className={styles.modalFotter}>
      <div className={styles.contentBox}>
        <span>Total</span>
        <span>{convertToLocalMoney(shoppingCart(cartList))}</span>
      </div>
      <div className={styles.contentBtns}>
        <a
          className={styles.finish}
          onClick={() =>
            finalizeOrder(
              setLoadingState,
              cartList,
              setCartList,
              setPendingOrder,
              setOrder,
              toggleModal
            )
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Finalizar pedido</button>
        </a>

        <button onClick={() => setCartList([])} className={styles.empty}>
          Esvaziar carrinho
        </button>
      </div>
    </div>
  );
};
