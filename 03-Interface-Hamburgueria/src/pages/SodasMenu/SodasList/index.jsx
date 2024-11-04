import styles from './styles.module.css';

import { v4 as uuidv4 } from 'uuid';
import { CardMenu } from '../../../components/CardMenu';
import { useEffect, useState } from 'react';
import { getToken } from '../../../utils/tokenActions';
import { useUserContext } from '../../../hooks/useUserContext';
import { fetchLoadData } from '../../../utils/fetchLoadData';
import { useLists } from '../../../hooks/useLists';

export const SodasList = () => {
  const { windowLoad, setWindowLoad } = useUserContext();
  const { sodasList, setSodasList } = useLists();
  const [loadItem, setLoadItem] = useState({ state: false, id: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (sodasList.length === 0) {
      const load = async () => {
        const requestConfig = {
          setList: setSodasList,
          token: getToken('@TOKEN'),
          endPoint: 'refrigerantes',
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
  }, [setSodasList]);

  const sortedList = [...sodasList].sort((a, b) => a.id - b.id);

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
            list={sodasList}
            setList={setSodasList}
            type={item.category.name}
          />
        ))}
      </ul>
    </>
  );
};
