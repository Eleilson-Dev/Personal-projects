import styles from './styles.module.scss';
import img from '../../../public/assets/burguer.png';
import { useUserContext } from '../../hooks/useUserContext';
import { addItemIntoModal } from '../../utils/modalActions';
import { convertToLocalMoney } from '../../utils/convertToLocalMoney';

export const CardMenu = ({ item }) => {
  const { cartList, setCartList } = useUserContext();

  return (
    <li className={styles.cardItem}>
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
          <button className={styles.btn1}>Compre agora</button>
        </div>
        <div className={styles.cardAction}>
          <button
            onClick={() =>
              addItemIntoModal({ ...item, quantity: 1 }, cartList, setCartList)
            }
            className={styles.btn2}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </li>
  );
};
