import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { RoutesMain } from './routes/RoutesMain';

function App() {
  return (
    <div className={`boxMain`}>
      <ToastContainer />
      <Header />
      <main className="container mainConteiner">
        <RoutesMain />
      </main>
    </div>
  );
}

export default App;
