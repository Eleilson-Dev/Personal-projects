import styles from './styles.module.scss';
import { useUserContext } from '../../hooks/useUserContext';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalList } from './ModalList';

export const Modal = () => {
  const { toggleModal, cartList } = useUserContext();
  return (
    <div className={styles.boxModal}>
      <div className={styles.yourCart}>
        <div className={styles.cartTop}>
          <h2>Meu carrinho</h2>
          <span onClick={toggleModal}>
            <IoCloseSharp />
          </span>
        </div>
        <div className={styles.cartList}>
          {cartList.length === 0 ? (
            <h3>Você ainda não possui nenhum pedido no carrinho!</h3>
          ) : (
            <ModalList />
          )}
        </div>
      </div>
    </div>
  );
};

// objeto esperado por pedido
// {
// 	"status": "pendente",
// 	"hamburgers": [
// 		{ "id": 4, "quantity": 1 },
// 		{ "id": 5, "quantity": 2 },
// 		{ "id": 3, "quantity": 3 }
// 	]
// }
