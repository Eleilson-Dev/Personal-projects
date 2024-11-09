import { HamburguersList } from './HamburguersList';
import { WindowLoad } from '../../components/WindowLoad';
import { useLists } from '../../hooks/useLists';

export const HamburguersMenu = () => {
  const { loading } = useLists();

  return <>{loading ? <WindowLoad /> : <HamburguersList />}</>;
};
