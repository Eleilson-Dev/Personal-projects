import { useUserContext } from '../../../hooks/useUserContext';
import styles from './styles.module.scss';
import { cancelOrder } from '../../../utils/cancelOrder';

export const PendingOrderFotter = () => {
  const { dataProps } = useUserContext();

  return (
    <div className={styles.pendingOrderFotter}>
      <div className={styles.contentBtns}>
        <button className={styles.complete}>Concluir pedido</button>
        <button
          onClick={() => {
            cancelOrder(dataProps);
          }}
          className={styles.cancel}
        >
          Cancelar pedido
        </button>
      </div>
    </div>
  );
};
