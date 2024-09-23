import { useUserContext } from '../../../hooks/useUserContext';
import styles from './styles.module.scss';
import { cancelOrder } from '../../../utils/cancelOrder';
import { callWhatsApp } from '../../../utils/callWhatsApp';

export const PendingOrderFotter = () => {
  const { dataProps } = useUserContext();
  const { id } = dataProps.order;

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
          <button onClick={() => dataProps.setPendingOrder(false)}>
            Concluir pedido
          </button>
        </a>
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
