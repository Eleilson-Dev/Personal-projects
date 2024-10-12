import { useEffect } from 'react';
import { ListMenu } from '../../components/ListMenu';
import { Modal } from '../../components/Modal';
import { PendingOrder } from '../../components/PendingOrder';
import { useUserContext } from '../../hooks/useUserContext';

export const Home = () => {
  const { isModalOpen, pendingOrder } = useUserContext();

  return (
    <main>
      {pendingOrder && <PendingOrder />}
      <ListMenu />
      {isModalOpen && <Modal />}
    </main>
  );
};
