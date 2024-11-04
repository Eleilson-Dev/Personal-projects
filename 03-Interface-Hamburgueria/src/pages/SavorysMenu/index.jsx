import { useUserContext } from '../../hooks/useUserContext';
import { SavorysList } from './SavoryList';
import { WindowLoad } from '../../components/WindowLoad';

export const SavorysMenu = () => {
  const { windowLoad } = useUserContext();

  return (
    <>
      {windowLoad && <WindowLoad />}

      <SavorysList />
    </>
  );
};
