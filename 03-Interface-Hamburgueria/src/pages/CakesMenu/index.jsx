import { useUserContext } from '../../hooks/useUserContext';
import { CakesList } from './CakesList';
import { WindowLoad } from '../../components/WindowLoad';

export const CakesMenu = () => {
  const { windowLoad } = useUserContext();

  return (
    <>
      {windowLoad && <WindowLoad />}

      <CakesList />
    </>
  );
};
