import styles from './styles.module.css';

import { useUserContext } from '../../hooks/useUserContext';
import { PendingOrderFotter } from './PendingOrderFotter';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { formatDate } from '../../utils/fomateDate';
import { Loading } from '../Loading';
import { IoCloseSharp } from 'react-icons/io5';
import img from '../../assets/pngtree-food.png';

export const PendingOrder = () => {
  const { loadingState, dataProps } = useUserContext();
  const formatOrderId = (id) => `#${id % 100}`;

  return (
    <div className={styles.boxPendingOrder}>
      <div className={styles.boxContent}>
        {loadingState.pendigOrderLoad && <Loading />}
        <div className={styles.top}>
          <h3>Você possui um pedido pendente</h3>
          <span onClick={() => dataProps.setPendingOrder(false)}>
            <IoCloseSharp />
          </span>
        </div>
        <div className={styles.order}>
          <div className={styles.imgAndDetails}>
            <div className={styles.imgBox}>
              <img src={img} />
            </div>
            <div className={styles.details}>
              <h4>
                Pedido N: <strong>###</strong>
              </h4>
              <span>
                Preço:
                <strong>
                  {convertToLocalMoney(dataProps.order.priceOrder)}
                </strong>
              </span>
            </div>
            <div className={styles.createdAt}>
              <h4>{formatDate(dataProps.order.createdAt)}</h4>
              <span>
                Status: <strong>{dataProps.order.status}</strong>
              </span>
            </div>
          </div>
        </div>
        <PendingOrderFotter />
      </div>
    </div>
  );
};
