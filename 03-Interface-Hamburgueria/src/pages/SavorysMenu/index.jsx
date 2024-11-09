import { SavorysList } from './SavoryList';
import { WindowLoad } from '../../components/WindowLoad';
import { useLists } from '../../hooks/useLists';

export const SavorysMenu = () => {
  const { loading } = useLists();

  return <>{loading ? <WindowLoad /> : <SavorysList />}</>;
};
