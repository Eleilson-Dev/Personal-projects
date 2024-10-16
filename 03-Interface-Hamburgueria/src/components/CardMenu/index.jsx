import styles from './styles.module.css';
import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { addItemIntoModal } from '../../utils/modalActions';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { Loading } from '../Loading';
import { singleOrder } from '../../utils/singleOrder';
import { ProductActions } from '../../fragments/ProductActions';
import img from '../../assets/burguer.png';

export const CardMenu = ({ item, setLoadingEnabled }) => {
  const { dataProps, user } = useUserContext();
  const [loadingCard, setLoadingCard] = useState(null);
  const [visibility, setVisibility] = useState(true);
  const isRender = user?.role === 'USER' && !item.visibility;

  return (
    <>
      {!isRender && (
        <li className={styles.cardItem}>
          {loadingCard && <Loading />}
          {!visibility && <div className={styles.itemHide}></div>}
          <div className={styles.boxImg}>
            <ProductActions
              item={item}
              setLoadingCard={setLoadingCard}
              visibility={visibility}
              setVisibility={setVisibility}
            />
            <img src={img} />
          </div>
          <div className={styles.details}>
            <h3>{item.name}</h3>
            <span>
              <strong>{item.size}</strong>
            </span>
            <span className={styles.price}>
              {convertToLocalMoney(item.price)}
            </span>
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
                onClick={() => {
                  setLoadingEnabled(false);
                  addItemIntoModal({ ...item, quantity: 1 }, dataProps);
                }}
                className={styles.btn2}
                disabled={dataProps.itemLoad}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </li>
      )}
    </>
  );
};
