import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { useState } from 'react';
import { PizzasList } from '../../components/PizzasList';

export const PizzasMenu = () => {
  const { loadingState } = useUserContext();
  const [loadingEnabled, setLoadingEnabled] = useState(true);

  return (
    <>
      {loadingEnabled && loadingState.windowLoad && (
        <div className={'windowLoad'}>
          <Loading />
        </div>
      )}

      <PizzasList setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
