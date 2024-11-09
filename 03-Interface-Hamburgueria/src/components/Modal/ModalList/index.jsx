import styles from './styles.module.css';

import { useUserContext } from '../../../hooks/useUserContext';
import { ModalItem } from '../ModalItem';

export const ModalList = () => {
  const { cartList } = useUserContext();

  return (
    <ul className={styles.modalList}>
      {cartList.map((item) => (
        <ModalItem key={`${item.id}-${item.categoryName}`} item={item} />
      ))}
    </ul>
  );
};
