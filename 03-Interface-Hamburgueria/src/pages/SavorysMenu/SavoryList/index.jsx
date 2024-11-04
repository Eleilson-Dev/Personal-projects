import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/tokenActions';
import { CardMenu } from '../../../components/CardMenu';
import { useUserContext } from '../../../hooks/useUserContext';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import { useLists } from '../../../hooks/useLists';

export const SavorysList = () => {
  const { windowLoad, setWindowLoad } = useUserContext();
  const { savorysList, setSavorysList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (savorysList.length === 0) {
      const load = async () => {
        const requestConfig = {
          setList: setSavorysList,
          token: getToken('@TOKEN'),
          endPoint: 'salgados',
          load: true,
          setWindowLoad,
        };

        await fetchLoadData(requestConfig);
        setIsLoaded(true);
      };

      load();
    } else {
      setIsLoaded(true);
    }
  }, [setSavorysList]);

  const sortedList = [...savorysList].sort((a, b) => a.id - b.id);

  return (
    <>
      <ul className={`${styles.listMenu} ${isLoaded ? styles.fadeIn : ''}`}>
        {!windowLoad && sortedList.length === 0 && (
          <h2>Nenhum produto a ser exibido!</h2>
        )}
        {sortedList.map((item) => (
          <CardMenu
            key={uuidv4()}
            item={item}
            loadItem={loadItem}
            setLoadItem={setLoadItem}
            img={item.imageUrl}
            type={item.category.name}
            list={savorysList}
            setList={setSavorysList}
          />
        ))}
      </ul>
    </>
  );
};
