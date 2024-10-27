import { useUserContext } from '../../hooks/useUserContext';
import { useState } from 'react';
import { Loading } from '../../components/Loading';
import { SavorysList } from './SavoryList';

export const SavorysMenu = () => {
  const { loadingState } = useUserContext();
  const [loadingEnabled, setLoadingEnabled] = useState(true);

  return (
    <>
      {loadingEnabled && loadingState.windowLoad && (
        <div className={'windowLoad'}>
          <Loading />
        </div>
      )}

      <SavorysList setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
