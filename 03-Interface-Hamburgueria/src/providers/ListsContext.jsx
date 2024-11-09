import { createContext, useState } from 'react';

export const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [lists, setLists] = useState({
    burgersList: [],
    pizzasList: [],
    savorysList: [],
    sodasList: [],
    juicesList: [],
    cakesList: [],
  });

  return (
    <ListsContext.Provider
      value={{
        lists,
        setLists,
        loading,
        setLoading,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
