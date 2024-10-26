import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/tokenActions';
import { CardMenu } from '../CardMenu';
import img from '../../assets/burguer.png';
import { useUserContext } from '../../hooks/useUserContext';
import { fetchLoadData } from '../../utils/fetchLoadData';
import { useLists } from '../../hooks/useLists';

export const HamburguersList = ({ setLoadingEnabled }) => {
  const { setLoadingState, loadingState } = useUserContext();
  const { burgersList, setBurgersList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });

  useEffect(() => {
    const load = async () => {
      setBurgersList([]);

      const requestConfig = {
        setList: setBurgersList,
        token: getToken('@TOKEN'),
        endPoint: 'hamburguers',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setBurgersList, setLoadingState]);

  const sortedList = [...burgersList].sort((a, b) => a.id - b.id);

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
            list={burgersList}
            setList={setBurgersList}
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
