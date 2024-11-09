import styles from './styles.module.css';

import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';
import { removeItemOfModal } from '../../../utils/modalActions';
import { useUserContext } from '../../../hooks/useUserContext';

export const ModalItem = React.memo(({ item }) => {
  const { cartList, setCartList } = useUserContext();

  const quantityPlus = () => {
    if (item.quantity < 99) {
      setCartList((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
  };

  const quantityMinos = () => {
    if (item.quantity > 1) {
      setCartList((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const handleRemove = () => {
    removeItemOfModal(item, cartList, setCartList);
  };

  return (
    <li>
      <div className={styles.imgBox}>
        <img src={item.img} alt={item.name} />
      </div>
      <div className={styles.details}>
        <div className={styles.nameAndPrice}>
          <h3>{item.name}</h3>
          <span>{convertToLocalMoney(item.price)}</span>
        </div>
        <div className={styles.qtd}>
          <button onClick={quantityMinos}>
            <IoIosArrowBack />
          </button>
          <span>{item.quantity}</span>
          <button onClick={quantityPlus}>
            <IoIosArrowForward />
          </button>
        </div>
        <div className={styles.trash} onClick={handleRemove}>
          <FaTrashCan />
        </div>
      </div>
    </li>
  );
});
