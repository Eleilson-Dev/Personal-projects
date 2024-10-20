import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { addItemIntoModal } from '../../utils/modalActions';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { Loading } from '../Loading';
import { singleOrder } from '../../utils/singleOrder';
import { ProductActions } from '../../fragments/ProductActions';

export const CardMenu = (props) => {
  const { item, loadItem, setLoadItem, img, type, buyNow } = props;

  const { dataProps, user, loadingState, setLoadingState } = useUserContext();
  const [visibility, setVisibility] = useState(true);
  const isRender = user?.role === 'regular' && !item.visibility;

  return (
    <>
      {!isRender && (
        <li className={styles.cardItem}>
          {dataProps.loadToDelete === item.id && <Loading />}
          {buyNow && loadItem.state && loadItem.id === item.id && <Loading />}

          {!visibility && <div className={styles.itemHide}></div>}
          <div className={styles.boxImg}>
            <ProductActions
              item={item}
              setLoadItem={setLoadItem}
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
              {buyNow && (
                <a
                  className={styles.btn1}
                  onClick={() =>
                    singleOrder(
                      item,
                      type,
                      setLoadItem,
                      setLoadingState,
                      dataProps
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={styles.btnDisabled}
                    disabled={buyNow && loadItem.state}
                  >
                    Compre agora
                  </button>
                </a>
              )}
            </div>
            <div className={styles.cardAction}>
              <button
                onClick={() => {
                  props.setLoadingEnabled(false);
                  addItemIntoModal(
                    { ...item, img, type, quantity: 1 },
                    dataProps
                  );
                }}
                className={styles.btn2}
                disabled={buyNow && loadItem.state}
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
