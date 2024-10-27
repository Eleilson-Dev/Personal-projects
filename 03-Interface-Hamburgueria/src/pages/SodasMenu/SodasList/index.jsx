import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { CardMenu } from '../../../components/CardMenu';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/tokenActions';
import { useUserContext } from '../../../hooks/useUserContext';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import img from '../../../assets/refri.webp';
import { useLists } from '../../../hooks/useLists';

export const SodasList = ({ setLoadingEnabled }) => {
  const { setLoadingState, loadingState } = useUserContext();
  const { sodasList, setSodasList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });

  useEffect(() => {
    const load = async () => {
      setSodasList([]);

      const requestConfig = {
        setList: setSodasList,
        token: getToken('@TOKEN'),
        endPoint: 'refrigerantes',
        load: true,
        setLoadingState,
      };

      await fetchLoadData(requestConfig);
    };

    load();
  }, [fetchLoadData, setSodasList, setLoadingState]);

  const sortedList = [...sodasList].sort((a, b) => a.id - b.id);

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
            list={sodasList}
            setList={setSodasList}
            type={item.category.name}
            setLoadingEnabled={setLoadingEnabled}
          />
        ))}
      </ul>
    </>
  );
};
