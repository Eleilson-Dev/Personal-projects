import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/tokenActions';
import { CardMenu } from '../../../components/CardMenu';
import { useUserContext } from '../../../hooks/useUserContext';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import { useLists } from '../../../hooks/useLists';
import img from '../../../assets/salgados.webp';

export const SavorysList = ({ setLoadingEnabled }) => {
  const { setLoadingState, loadingState } = useUserContext();
  const { savorysList, setSavorysList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });

  useEffect(() => {
    const load = async () => {
      setSavorysList([]);

      const requestConfig = {
        setList: setSavorysList,
        token: getToken('@TOKEN'),
        endPoint: 'salgados',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setSavorysList, setLoadingState]);

  const sortedList = [...savorysList].sort((a, b) => a.id - b.id);

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
            list={savorysList}
            setList={setSavorysList}
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
