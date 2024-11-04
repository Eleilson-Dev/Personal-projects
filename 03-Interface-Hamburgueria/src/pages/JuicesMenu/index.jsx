import { useUserContext } from '../../hooks/useUserContext';
import { JuicesList } from './JuicesList';
import { WindowLoad } from '../../components/WindowLoad';

export const JuicesMenu = () => {
  const { windowLoad } = useUserContext();

  return (
    <>
      {windowLoad && <WindowLoad />}

      <JuicesList />
    </>
  );
};
