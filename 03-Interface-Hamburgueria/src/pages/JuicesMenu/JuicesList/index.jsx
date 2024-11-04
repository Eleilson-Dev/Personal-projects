import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { CardMenu } from '../../../components/CardMenu';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/tokenActions';
import { useUserContext } from '../../../hooks/useUserContext';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import { useLists } from '../../../hooks/useLists';

export const JuicesList = () => {
  const { windowLoad, setWindowLoad } = useUserContext();
  const { juicesList, setJuicesList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (juicesList.length === 0) {
      const load = async () => {
        const requestConfig = {
          setList: setJuicesList,
          token: getToken('@TOKEN'),
          endPoint: 'sucos',
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
  }, [setJuicesList]);

  const sortedList = [...juicesList].sort((a, b) => a.id - b.id);

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
            list={juicesList}
            setList={setJuicesList}
            type={item.category.name}
          />
        ))}
      </ul>
    </>
  );
};
