import { useContext } from 'react';
import { ListsContext } from '../providers/ListsContext';

export const useLists = () => useContext(ListsContext);
