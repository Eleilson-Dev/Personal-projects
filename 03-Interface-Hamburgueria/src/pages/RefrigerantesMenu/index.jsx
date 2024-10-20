import { Modal } from '../../components/Modal';
import { PendingOrder } from '../../components/PendingOrder';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { useState } from 'react';
import { RefrigerantesList } from '../../components/RefrigerantesList';

export const RefrigerantesMenu = () => {
  const { isModalOpen, pendingOrder, loadingState } = useUserContext();
  const [loadingEnabled, setLoadingEnabled] = useState(true);

  return (
    <>
      {loadingEnabled && loadingState.windowLoad && (
        <div className={'windowLoad'}>
          <Loading />
        </div>
      )}

      {pendingOrder && <PendingOrder />}
      {isModalOpen && <Modal setLoadingEnabled={setLoadingEnabled} />}

      <RefrigerantesList setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
