import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { RoutesMain } from './routes/RoutesMain';
import { useUserContext } from './hooks/useUserContext';
import { Modal } from './components/Modal';
import { PendingOrder } from './components/PendingOrder';
import { Categories } from './components/Categories';

export const App = () => {
  const { pendingOrder, isModalOpen } = useUserContext();

  return (
    <div className={`boxMain`}>
      {isModalOpen && <Modal />}
      {pendingOrder && <PendingOrder />}

      <ToastContainer />
      <Header />
      <Categories />

      <main className="container">
        <RoutesMain />
      </main>
    </div>
  );
};
