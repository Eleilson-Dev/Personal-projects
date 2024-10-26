import { HamburguersList } from '../../components/HamburguersList';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { useState } from 'react';

export const HamburguersMenu = () => {
  const { loadingState } = useUserContext();
  const [loadingEnabled, setLoadingEnabled] = useState(true);

  return (
    <>
      {loadingEnabled && loadingState.windowLoad && (
        <div className={'windowLoad'}>
          <Loading />
        </div>
      )}

      <HamburguersList setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
