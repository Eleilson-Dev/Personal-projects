import { HamburguersList } from '../../components/HamburguersList';
import { Modal } from '../../components/Modal';
import { PendingOrder } from '../../components/PendingOrder';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { useState } from 'react';

export const HamburguersMenu = () => {
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

      <HamburguersList setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
