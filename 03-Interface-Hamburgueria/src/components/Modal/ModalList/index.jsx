import styles from './styles.module.scss';
import { useUserContext } from '../../../hooks/useUserContext';
import { removeItemOfModal } from '../../../utils/modalActions';
import imgBurguer from '../../../../public/assets/burguer.png';
import { FaTrash } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { convertToLocalMoney } from '../../../utils/convertToLocalMoney';

export const ModalList = () => {
  const { cartList, setCartList } = useUserContext();

  const quantityPlus = (itemId) => {
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const quantityMinos = (itemId) => {
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <ul className={styles.modalList}>
      {cartList.map((item) => (
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
              onClick={() => removeItemOfModal(item.id, cartList, setCartList)}
            >
              <FaTrash />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
