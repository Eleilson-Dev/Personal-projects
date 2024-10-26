import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { CardMenu } from '../CardMenu';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/tokenActions';
import { useUserContext } from '../../hooks/useUserContext';
import { fetchLoadData } from '../../utils/fetchLoadData';
import img from '../../assets/refri.webp';
import { useLists } from '../../hooks/useLists';

export const RefrigerantesList = ({ setLoadingEnabled }) => {
  const { setLoadingState, loadingState } = useUserContext();
  const { refrisList, setRefrisList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });

  useEffect(() => {
    const load = async () => {
      setRefrisList([]);

      const requestConfig = {
        setList: setRefrisList,
        token: getToken('@TOKEN'),
        endPoint: 'refrigerantes',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setRefrisList, setLoadingState]);

  const sortedList = [...refrisList].sort((a, b) => a.id - b.id);

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
            list={refrisList}
            setList={setRefrisList}
            type={item.category.name}
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
