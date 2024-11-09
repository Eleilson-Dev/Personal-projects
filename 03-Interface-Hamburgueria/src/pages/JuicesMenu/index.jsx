import { JuicesList } from './JuicesList';
import { WindowLoad } from '../../components/WindowLoad';
import { useLists } from '../../hooks/useLists';

export const JuicesMenu = () => {
  const { loading } = useLists();

  return <>{loading ? <WindowLoad /> : <JuicesList />}</>;
};
