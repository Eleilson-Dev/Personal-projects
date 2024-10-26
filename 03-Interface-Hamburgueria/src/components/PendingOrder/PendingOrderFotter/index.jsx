import styles from './styles.module.css';
import { useUserContext } from '../../../hooks/useUserContext';
import { cancelOrder } from '../../../utils/cancelOrder';
import { callWhatsApp } from '../../../utils/callWhatsApp';

export const PendingOrderFotter = () => {
  const { setLoadingState, order, setPendingOrder } = useUserContext();
  const { id } = order;

  return (
    <div className={styles.pendingOrderFotter}>
      <div className={styles.contentBtns}>
        <a
          className={styles.complete}
          href={callWhatsApp({
            phoneNumber: '+5598985598696',
            message: `Pedido N: #${id}`,
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={() => setPendingOrder(false)}>
            Concluir pedido
          </button>
        </a>
        <button
          onClick={() => {
            cancelOrder(setLoadingState, order, setPendingOrder);
          }}
          className={styles.cancel}
        >
          Cancelar pedido
        </button>
      </div>
    </div>
  );
};
