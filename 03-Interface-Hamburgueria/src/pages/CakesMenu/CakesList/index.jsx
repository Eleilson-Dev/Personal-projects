import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { CardMenu } from '../../../components/CardMenu';
import { useLists } from '../../../hooks/useLists';
import { getToken } from '../../../utils/tokenActions';
import { fetchLoadData } from '../../../utils/fetchLoadData';

export const CakesList = () => {
  const { lists, setLists, loading, setLoading } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (lists.cakesList.length > 0) {
      setIsLoaded(true);
      return;
    }

    const loadData = async () => {
      const requestConfig = {
        listName: 'cakesList',
        setLists,
        token: getToken('@TOKEN'),
        endPoint: 'bolos',
        setLoading,
      };

      await fetchLoadData(requestConfig);
    };

    loadData();
  }, [lists.cakesList.length, setLists, setLoading]);

  const sortedList = [...lists.cakesList].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu} ${isLoaded ? styles.fadeIn : ''}`}>
        {!loading && isLoaded && sortedList.length === 0 && (
          <h2>Nenhum produto a ser exibido!</h2>
        )}
        {!loading &&
          sortedList.map((item) => (
            <CardMenu
              key={uuidv4()}
              item={item}
              loadItem={loadItem}
              setLoadItem={setLoadItem}
              img={item.imageUrl}
              type={item.category.name}
              list={lists.cakesList}
              listName="cakesList"
              setLists={setLists}
            />
          ))}
      </ul>
    </>
  );
};
