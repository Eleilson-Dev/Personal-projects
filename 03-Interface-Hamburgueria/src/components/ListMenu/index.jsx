import styles from './styles.module.scss';
import { CardMenu } from '../CardMenu';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../services/api';

export const ListMenu = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get('/lanches');
      setList(response.data);
    };

    loadData();
  }, []);

  return (
    <ul className={`container ${styles.listMenu}`}>
      {list.map((item) => (
        <CardMenu key={item.id} props={item} />
      ))}
    </ul>
  );
};
