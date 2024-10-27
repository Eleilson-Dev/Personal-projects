import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/tokenActions';
import { CardMenu } from '../../../components/CardMenu';
import { useUserContext } from '../../../hooks/useUserContext';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import { useLists } from '../../../hooks/useLists';
import img from '../../../assets/pizza-food.webp';

export const PizzasList = ({ setLoadingEnabled }) => {
  const { setLoadingState, loadingState } = useUserContext();
  const { pizzasList, setPizzasList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });

  useEffect(() => {
    const load = async () => {
      setPizzasList([]);

      const requestConfig = {
        setList: setPizzasList,
        token: getToken('@TOKEN'),
        endPoint: 'pizzas',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setPizzasList, setLoadingState]);

  const sortedList = [...pizzasList].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu}`}>
        {!loadingState.windowLoad && sortedList.length === 0 && (
          <h2>Nenhum produto a ser exibido!</h2>
        )}
        {sortedList.map((item) => (
          <CardMenu
            key={uuidv4()}
            item={item}
            loadItem={loadItem}
            setLoadItem={setLoadItem}
            img={img}
            type={item.category.name}
            list={pizzasList}
            setList={setPizzasList}
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
