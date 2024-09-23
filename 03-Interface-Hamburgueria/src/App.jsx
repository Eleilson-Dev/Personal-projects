import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { RoutesMain } from './routes/RoutesMain';

function App() {
  return (
    <div className={`boxMain`}>
      <ToastContainer />
      <Header />
      <RoutesMain />
    </div>
  );
}

export default App;
