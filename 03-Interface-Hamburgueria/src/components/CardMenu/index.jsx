import styles from './styles.module.css';
import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { addItemIntoModal } from '../../utils/modalActions';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { Loading } from '../Loading';
import { singleOrder } from '../../utils/singleOrder';
import img from '../../assets/burguer.png';

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
          <a
            className={styles.btn1}
            onClick={() => singleOrder(item, setLoadingCard, dataProps)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={styles.btnDisabled}
              disabled={dataProps.itemLoad}
            >
              Compre agora
            </button>
          </a>
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
