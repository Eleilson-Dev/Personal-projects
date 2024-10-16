import { ListMenu } from '../../components/ListMenu';
import { Modal } from '../../components/Modal';
import { PendingOrder } from '../../components/PendingOrder';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';
import { useState } from 'react';

export const Home = () => {
  const { isModalOpen, pendingOrder, windowLoad } = useUserContext();
  const [loadingEnabled, setLoadingEnabled] = useState(true);

  return (
    <>
      {loadingEnabled && windowLoad && (
        <div className={'windowLoad'}>
          <Loading />
        </div>
      )}

      {pendingOrder && <PendingOrder />}
      {isModalOpen && <Modal setLoadingEnabled={setLoadingEnabled} />}

      <ListMenu setLoadingEnabled={setLoadingEnabled} />
    </>
  );
};
