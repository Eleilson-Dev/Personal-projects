import { CakesList } from './CakesList';
import { WindowLoad } from '../../components/WindowLoad';
import { useLists } from '../../hooks/useLists';

export const CakesMenu = () => {
  const { loading } = useLists();

  return <>{loading ? <WindowLoad /> : <CakesList />}</>;
};
