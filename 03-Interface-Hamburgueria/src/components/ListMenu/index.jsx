import styles from './styles.module.css';

import { CardMenu } from '../CardMenu';
import { useUserContext } from '../../hooks/useUserContext';

export const ListMenu = ({ setLoadingEnabled }) => {
  const { list } = useUserContext();

  const sortedList = [...list].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu}`}>
        {sortedList.map((item) => (
          <CardMenu
            key={item.id}
            item={item}
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
