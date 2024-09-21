import { ListMenu } from '../../components/ListMenu';
import { Modal } from '../../components/Modal';
import { useUserContext } from '../../hooks/useUserContext';

export const Home = () => {
  const { isModalOpen } = useUserContext();
  return (
    <main>
      <ListMenu />
      {isModalOpen && <Modal />}
    </main>
  );
};
