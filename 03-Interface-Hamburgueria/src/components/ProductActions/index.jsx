import styles from './styles.module.css';

import { useState, useCallback } from 'react';
import { FaPen } from 'react-icons/fa';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';
import { useUserContext } from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { changeProductVisibility } from '../../utils/changeProductVisibility';
import { deleteProduct } from '../../utils/deleteProduct';

export const ProductActions = ({
  item,
  visibility,
  list,
  listName,
  setLists,
}) => {
  const { user, setLoadingState } = useUserContext();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingVisibility, setIsChangingVisibility] = useState(false);

  const navigate = useNavigate();

  const changeVisibility = useCallback(() => {
    changeProductVisibility(
      item,
      list,
      listName,
      setLists,
      setLoadingState,
      setIsChangingVisibility
    );
  }, [item, list, setLists, setLoadingState]);

  const deleteItem = useCallback(() => {
    deleteProduct(item, listName, setLists, setLoadingState, setIsDeleting);
  }, [item, setLists, setLoadingState]);

  const handleEdit = (item) => {
    const endPoint = item.category.name.slice(0, -1);
    navigate(`/edit/${endPoint}/${item.id}`);
  };

  return (
    <div className={styles.contentBox}>
      {user?.role === 'admin' && (
        <>
          <button
            type="button"
            onClick={() => handleEdit(item)}
            className={styles.edit}
            disabled={isDeleting || isChangingVisibility}
          >
            <FaPen />
          </button>
          <button
            type="button"
            onClick={() => changeVisibility(item)}
            className={styles.hide}
            disabled={isChangingVisibility}
          >
            {visibility ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
          <button
            type="button"
            onClick={() => deleteItem(item)}
            className={styles.delete}
            disabled={isDeleting}
          >
            <FaTrashCan />
          </button>
        </>
      )}
    </div>
  );
};
