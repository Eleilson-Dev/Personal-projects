import { createContext, useState } from 'react';

export const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [burgersList, setBurgersList] = useState([]);
  const [pizzasList, setPizzasList] = useState([]);
  const [savorysList, setSavorysList] = useState([]);
  const [sodasList, setSodasList] = useState([]);
  const [juicesList, setJuicesList] = useState([]);
  const [cakesList, setCakesList] = useState([]);

  return (
    <ListsContext.Provider
      value={{
        burgersList,
        setBurgersList,
        savorysList,
        setSavorysList,
        pizzasList,
        setPizzasList,
        sodasList,
        setSodasList,
        juicesList,
        setJuicesList,
        cakesList,
        setCakesList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
