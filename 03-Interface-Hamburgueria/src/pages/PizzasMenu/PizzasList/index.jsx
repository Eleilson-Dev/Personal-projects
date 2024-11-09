import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { CardMenu } from '../../../components/CardMenu';
import { useLists } from '../../../hooks/useLists';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import { getToken } from '../../../utils/tokenActions';

export const PizzasList = () => {
  const { lists, setLists, loading, setLoading } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (lists.pizzasList.length > 0) {
      setIsLoaded(true);
      return;
    }

    const loadData = async () => {
      const requestConfig = {
        listName: 'pizzasList',
        setLists,
        token: getToken('@TOKEN'),
        endPoint: 'pizzas',
        setLoading,
      };

      await fetchLoadData(requestConfig);
    };

    loadData();
  }, [lists.pizzasList.length, setLists, setLoading]);

  const sortedList = [...lists.pizzasList].sort((a, b) => a.id - b.id);

  return (
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
            list={lists.pizzasList}
            listName="pizzasList"
            setLists={setLists}
          />
        ))}
    </ul>
  );
};
