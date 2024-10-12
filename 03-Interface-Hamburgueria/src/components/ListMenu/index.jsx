import styles from './styles.module.css';
import { CardMenu } from '../CardMenu';
import { useUserContext } from '../../hooks/useUserContext';

export const ListMenu = () => {
  const { list } = useUserContext();

  return (
    <ul className={`container ${styles.listMenu}`}>
      {list.map((item) => (
        <CardMenu key={item.id} item={item} />
      ))}
    </ul>
  );
};
