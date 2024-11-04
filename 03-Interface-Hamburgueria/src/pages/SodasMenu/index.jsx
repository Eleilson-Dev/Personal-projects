import { useUserContext } from '../../hooks/useUserContext';
import { SodasList } from './SodasList';
import { WindowLoad } from '../../components/WindowLoad';

export const SodasMenu = () => {
  const { windowLoad } = useUserContext();

  return (
    <>
      {windowLoad && <WindowLoad />}

      <SodasList />
    </>
  );
};
