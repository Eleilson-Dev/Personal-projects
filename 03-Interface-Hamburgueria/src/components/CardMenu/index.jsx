import styles from './styles.module.css';

import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { addItemIntoModal } from '../../utils/modalActions';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';
import { Loading } from '../Loading';
import { singleOrder } from '../../utils/singleOrder';
import { ProductActions } from '../ProductActions';

export const CardMenu = ({
  item,
  loadItem,
  setLoadItem,
  img,
  type,
  setLoadingEnabled,
  list,
  setList,
}) => {
  const {
    cartList,
    setCartList,
    user,
    loadingState,
    setLoadingState,
    setPendingOrder,
    setOrder,
  } = useUserContext();

  const [visibility, setVisibility] = useState(item.visibility);
  const isRender = user?.role === 'regular' && !item.visibility;

  const handleBuyNow = () => {
    singleOrder(
      item,
      type,
      setLoadItem,
      setLoadingState,
      setPendingOrder,
      setOrder
    );
  };

  const handleAddToCart = () => {
    setLoadingEnabled(false);
    addItemIntoModal(
      { ...item, img, type, quantity: 1 },
      cartList,
      setCartList
    );
  };

  const renderLoading = () => {
    if (
      loadingState.loadToDelete === item.id ||
      (item.price > 15 && loadItem.state && loadItem.id === item.id)
    ) {
      return <Loading />;
    }
  };

  if (isRender) {
    return null;
  }

  return (
    <>
      <li className={styles.cardItem}>
        {renderLoading()}

        {!item.visibility && <div className={styles.itemHide}></div>}
        <div className={styles.boxImg}>
          <ProductActions
            item={item}
            setLoadItem={setLoadItem}
            visibility={visibility}
            setVisibility={setVisibility}
            list={list}
            setList={setList}
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
            {item.price > 15 && (
              <a
                className={styles.btn1}
                onClick={() => handleBuyNow()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className={styles.btnDisabled}
                  disabled={item.price > 15 && loadItem.state}
                >
                  Compre agora
                </button>
              </a>
            )}
          </div>
          <div className={styles.cardAction}>
            <button
              onClick={() => {
                setLoadingEnabled(false);
                handleAddToCart();
              }}
              className={styles.btn2}
              disabled={item.price > 15 && loadItem.state}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </li>
    </>
  );
};
