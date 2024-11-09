import { PizzasList } from './PizzasList';
import { WindowLoad } from '../../components/WindowLoad';
import { useLists } from '../../hooks/useLists';

export const PizzasMenu = () => {
  const { loading } = useLists();

  return <>{loading ? <WindowLoad /> : <PizzasList />}</>;
};
