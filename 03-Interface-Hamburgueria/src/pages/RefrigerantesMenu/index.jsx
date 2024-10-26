import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { useState } from 'react';
import { RefrigerantesList } from '../../components/RefrigerantesList';

export const RefrigerantesMenu = () => {
  const { loadingState } = useUserContext();
  const [loadingEnabled, setLoadingEnabled] = useState(true);

  return (
    <>
      {loadingEnabled && loadingState.windowLoad && (
        <div className={'windowLoad'}>
          <Loading />
        </div>
      )}

      <RefrigerantesList setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
