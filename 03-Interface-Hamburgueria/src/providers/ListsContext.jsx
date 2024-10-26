import { createContext, useState } from 'react';

export const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [burgersList, setBurgersList] = useState([]);
  const [pizzasList, setPizzasList] = useState([]);
  const [refrisList, setRefrisList] = useState([]);

  return (
    <ListsContext.Provider
      value={{
        burgersList,
        setBurgersList,
        pizzasList,
        setPizzasList,
        refrisList,
        setRefrisList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
