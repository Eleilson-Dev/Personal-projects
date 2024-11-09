import { SodasList } from './SodasList';
import { WindowLoad } from '../../components/WindowLoad';
import { useLists } from '../../hooks/useLists';

export const SodasMenu = () => {
  const { loading } = useLists();

  return <>{loading ? <WindowLoad /> : <SodasList />}</>;
};
