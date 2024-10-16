import styles from './styles.module.css';
import { useUserContext } from '../../../hooks/useUserContext';
import { removeItemOfModal } from '../../../utils/modalActions';
import { FaTrashCan } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';
import imgBurguer from '../../../assets/burguer.png';

export const ModalList = ({ setLoadingEnabled }) => {
  const { dataProps } = useUserContext();

  const quantityPlus = (itemId) => {
    dataProps.setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.id === itemId && item.quantity < 99
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const quantityMinos = (itemId) => {
    dataProps.setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <ul className={styles.modalList}>
      {dataProps.cartList.map((item) => (
        <li key={item.id}>
          <div className={styles.imgBox}>
            <img src={imgBurguer} />
          </div>
          <div className={styles.details}>
            <div className={styles.nameAndPrice}>
              <h3>{item.name}</h3>
              <span>{convertToLocalMoney(item.price)}</span>
            </div>
            <div className={styles.qtd}>
              <button onClick={() => quantityMinos(item.id)}>
                <IoIosArrowBack />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => quantityPlus(item.id)}>
                <IoIosArrowForward />
              </button>
            </div>
            <div
              className={styles.trash}
              onClick={() => {
                removeItemOfModal(item.id, dataProps);
                setLoadingEnabled(false);
              }}
            >
              <FaTrashCan />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
