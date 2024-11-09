import styles from './styles.module.css';

import { useRef, useState, useEffect } from 'react';
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export const Categories = () => {
  const { isUserLoggedIn, categories, setWindowLoad } = useUserContext();
  const menuRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [leftArrowStyle, setLeftArrowStyle] = useState({});
  const [rightArrowStyle, setRightArrowStyle] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = categories.find((cat) =>
      location.pathname.includes(cat.name)
    );

    return category ? category.name : '';
  });

  const checkScrollPosition = () => {
    if (menuRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;

      const atStart = scrollLeft === 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth;

      const canScroll = scrollWidth > clientWidth;

      setShowLeftArrow(canScroll && !atStart);
      setShowRightArrow(canScroll && !atEnd);
    }
  };

  const scroll = (direction) => {
    if (menuRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      menuRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const category = categories.find((cat) =>
      location.pathname.includes(cat.name)
    );

    if (category) setSelectedCategory(category.name);

    checkScrollPosition();
    if (menuRef.current) {
      menuRef.current.addEventListener('scroll', checkScrollPosition);
    }

    window.addEventListener('resize', checkScrollPosition);

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [location, categories]);

  const callRedirect = (categoryName) => {
    if (location.pathname === `/menu/${categoryName}`) {
      return;
    }

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

  const list = [
    'Carnes',
    'Massas',
    'Doces',
    'Sorvetes',
    'Cafés',
    'Chocolates',
    'Frutas',
    'Vegetais',
    'Sopas',
    'Sanduíches',
    'Petiscos',
    'Tortas',
    'Biscoitos',
    'Queijos',
    'Cremes',
    'Iogurtes',
    'Pães',
    'Grãos',
    'Batatas',
    'Castanhas',
    'Temperos',
    'Peixes',
    'Ovos',
    'Ervas',
    'Mel',
  ];

  return (
    <>
      {!isUserLoggedIn && (
        <div className={`${styles.sidebarContainer} container`}>
          {showLeftArrow && (
            <div className={styles.btnLeft}>
              <button
                className={`${styles.scrollButton} ${styles.left}`}
                style={leftArrowStyle}
                onClick={() => scroll('left')}
              >
                <MdKeyboardArrowLeft />
              </button>
            </div>
          )}
          <div className={styles.menu} ref={menuRef}>
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

            {list.map((item, index) => {
              return (
                <button key={index} className={styles.notSelect}>
                  {item}
                </button>
              );
            })}
          </div>
          {showRightArrow && (
            <div className={styles.btnRigth}>
              <button
                className={`${styles.scrollButton} ${styles.right}`}
                style={rightArrowStyle}
                onClick={() => scroll('right')}
              >
                <MdOutlineKeyboardArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
