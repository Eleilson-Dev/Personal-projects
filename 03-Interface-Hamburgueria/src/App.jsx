import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { useUserContext } from './hooks/useUserContext';
import { RoutesMain } from './routes/RoutesMain';

function App() {
  const { isModalOpen } = useUserContext();
  return (
    <div className={`boxMain ${isModalOpen ? 'off-scroll' : null}`}>
      <ToastContainer />
      <Header />
      <RoutesMain />
    </div>
  );
}

export default App;
