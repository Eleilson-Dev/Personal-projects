import styles from './styles.module.scss';
import { useUserContext } from '../../hooks/useUserContext';
import img from '../../../public/assets/burguer.png';
import { PendingOrderFotter } from './PendingOrderFotter';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { formatDate } from '../../utils/fomateDate';
import { Loading } from '../Loading';

export const PendingOrder = () => {
  const { dataProps } = useUserContext();

  return (
    <div className={styles.boxPendingOrder}>
      <div className={styles.boxContent}>
        {dataProps.cancelOrderLoad && <Loading />}
        <div className={styles.top}>
          <h3>Você possui um pedido pendente</h3>
        </div>
        <div className={styles.order}>
          <div className={styles.imgAndDetails}>
            <div className={styles.imgBox}>
              <img src={img} />
            </div>
            <div className={styles.details}>
              <h4>
                Pedido N: #<strong>{dataProps.order.id}</strong>
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
