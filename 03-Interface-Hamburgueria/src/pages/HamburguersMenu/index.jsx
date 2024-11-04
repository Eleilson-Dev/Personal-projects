import { useUserContext } from '../../hooks/useUserContext';
import { HamburguersList } from './HamburguersList';
import { WindowLoad } from '../../components/WindowLoad';

export const HamburguersMenu = () => {
  const { windowLoad } = useUserContext();

  return (
    <>
      {windowLoad && <WindowLoad />}

      <HamburguersList />
    </>
  );
};
