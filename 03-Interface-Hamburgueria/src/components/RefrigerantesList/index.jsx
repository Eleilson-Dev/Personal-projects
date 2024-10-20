import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { CardMenu } from '../CardMenu';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/tokenActions';
import { useUserContext } from '../../hooks/useUserContext';
import { fetchLoadData } from '../../utils/fetchLoadData';
import img from '../../assets/refri.webp';

export const RefrigerantesList = ({ setLoadingEnabled }) => {
  const { setLoadingState } = useUserContext();
  const [list, setList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const requestConfig = {
        setList,
        token: getToken('@TOKEN'),
        endPoint: 'refrigerantes',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setList, setLoadingState]);

  const sortedList = [...list].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu}`}>
        {sortedList.map((item) => (
          <CardMenu
            key={uuidv4()}
            item={item}
            img={img}
            type="refrigerante"
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
