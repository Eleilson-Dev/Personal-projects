import styles from './styles.module.scss';
import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { addItemIntoModal } from '../../utils/modalActions';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { Loading } from '../Loading';
import img from '../../../public/assets/burguer.png';
import { singleOrder } from '../../utils/singleOrder';

export const CardMenu = ({ item }) => {
  const { dataProps } = useUserContext();

  const [loadingCard, setLoadingCard] = useState(null);

  return (
    <li className={styles.cardItem}>
      {loadingCard && <Loading />}
      <div className={styles.boxImg}>
        <img src={img} />
      </div>
      <div className={styles.details}>
        <h3>{item.name}</h3>
        <span>
          <strong>{item.size}</strong>
        </span>
        <span className={styles.price}>{convertToLocalMoney(item.price)}</span>
        <div className={styles.cardAction}>
          <button
            onClick={() => singleOrder(item, setLoadingCard, dataProps)}
            className={styles.btn1}
            disabled={dataProps.itemLoad}
          >
            Compre agora
          </button>
        </div>
        <div className={styles.cardAction}>
          <button
            onClick={() =>
              addItemIntoModal({ ...item, quantity: 1 }, dataProps)
            }
            className={styles.btn2}
            disabled={dataProps.itemLoad}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </li>
  );
};
