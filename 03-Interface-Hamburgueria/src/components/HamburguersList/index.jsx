import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/tokenActions';
import { CardMenu } from '../CardMenu';
import img from '../../assets/burguer.png';
import { useUserContext } from '../../hooks/useUserContext';
import { fetchLoadData } from '../../utils/fetchLoadData';

export const HamburguersList = ({ setLoadingEnabled }) => {
  const { primaryMenu, setPrimaryMenu, setLoadingState } = useUserContext();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });

  useEffect(() => {
    setPrimaryMenu([]);

    const load = async () => {
      const requestConfig = {
        setList: setPrimaryMenu,
        token: getToken('@TOKEN'),
        endPoint: 'hamburguers',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setPrimaryMenu, setLoadingState]);

  const sortedList = [...primaryMenu].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu}`}>
        {sortedList.map((item) => (
          <CardMenu
            key={uuidv4()}
            item={item}
            loadItem={loadItem}
            setLoadItem={setLoadItem}
            img={img}
            buyNow={true}
            type="hamburguer"
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
