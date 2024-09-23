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
          href={callWhatsApp('98985598696', `Pedido N: #${id}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={() => console.log(dataProps)}>
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