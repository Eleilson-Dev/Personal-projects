import styles from './styles.module.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { useLists } from '../../hooks/useLists';

export const Categories = () => {
  const { isUserLoggedIn, categories } = useUserContext();
  const { setBurgersList, setRefrisList, setPizzasList, setCakesList } =
    useLists();
  const navigate = useNavigate();
  const location = useLocation();

  const resetFunctions = {
    hamburguer: setBurgersList,
    refrigerante: setRefrisList,
    pizza: setPizzasList,
    bolos: setCakesList,
  };

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = categories.find((cat) =>
      location.pathname.includes(cat.name)
    );

    return category ? category.name : '';
  });

  useEffect(() => {
    const category = categories.find((cat) =>
      location.pathname.includes(cat.name)
    );

    if (category) setSelectedCategory(category.name);
  }, [location, categories]);

  const callRedirect = (categoryName) => {
    if (location.pathname === `/menu/${categoryName}`) {
      return;
    }

    Object.keys(resetFunctions).forEach((key) => {
      if (key !== categoryName && resetFunctions[key]) {
        resetFunctions[key]([]);
      }
    });

    setSelectedCategory(categoryName);
    navigate(`/menu/${categoryName}`);
  };

  const orderedCategories = categories
    .map((category) => {
      const order = [
        'hamburguers',
        'salgados',
        'pizzas',
        'refrigerantes',
        'sucos',
        'bolos',
      ];
      return { ...category, index: order.indexOf(category.name.toLowerCase()) };
    })
    .sort((a, b) => a.index - b.index);

  return (
    <>
      {!isUserLoggedIn && (
        <div className={styles.boxConteiner}>
          <div className={`container ${styles.boxContent}`}>
            {orderedCategories.map(({ id, name }) => (
              <button
                key={id}
                onClick={() => callRedirect(name)}
                className={
                  selectedCategory === name ? styles.selected : styles.notSelect
                }
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
