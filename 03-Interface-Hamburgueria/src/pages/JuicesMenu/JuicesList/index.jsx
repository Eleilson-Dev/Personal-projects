import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { CardMenu } from '../../../components/CardMenu';
import { useEffect, useState } from 'react';
import { useLists } from '../../../hooks/useLists';
import { getToken } from '../../../utils/tokenActions';
import { fetchLoadData } from '../../../utils/fetchLoadData';

export const JuicesList = () => {
  const { lists, setLists, loading, setLoading } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (lists.juicesList.length > 0) {
      setIsLoaded(true);
      return;
    }

    const loadData = async () => {
      const requestConfig = {
        listName: 'juicesList',
        setLists,
        token: getToken('@TOKEN'),
        endPoint: 'sucos',
        setLoading,
      };

      await fetchLoadData(requestConfig);
    };

    loadData();
  }, [lists.juicesList.length, setLists, setLoading]);

  const sortedList = [...lists.juicesList].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu} ${isLoaded ? styles.fadeIn : ''}`}>
        {!loading && sortedList.length === 0 && (
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
              list={lists.juicesList}
              listName="juicesList"
              setLists={setLists}
            />
          ))}
      </ul>
    </>
  );
};
