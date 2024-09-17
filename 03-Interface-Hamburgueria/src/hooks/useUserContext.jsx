import { useContext } from 'react';
import { UserContext } from '../providers/UserContext';

export const useUserContext = () => {
  return useContext(UserContext);
};
