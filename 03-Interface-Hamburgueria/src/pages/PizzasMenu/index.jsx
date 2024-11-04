import { useUserContext } from '../../hooks/useUserContext';
import { PizzasList } from './PizzasList';
import { WindowLoad } from '../../components/WindowLoad';

export const PizzasMenu = () => {
  const { windowLoad } = useUserContext();

  return (
    <>
      {windowLoad && <WindowLoad />}

      <PizzasList />
    </>
  );
};
