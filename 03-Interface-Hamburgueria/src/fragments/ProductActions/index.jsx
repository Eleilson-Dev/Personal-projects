import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FaPen } from 'react-icons/fa';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';
import { api } from '../../services/api';
import { getToken } from '../../utils/tokenActions';
import { loadProductData } from '../../utils/loadProductsData';
import { useUserContext } from '../../hooks/useUserContext';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const ProductActions = ({
  item,
  setLoadingCard,
  visibility,
  setVisibility,
}) => {
  const { user, list, setList, setWindowLoad } = useUserContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingVisibility, setIsChangingVisibility] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisibility(item.visibility);
  }, [item.visibility, setVisibility]);

  const deleteItem = useCallback(async () => {
    try {
      setIsDeleting(true);
      setLoadingCard(true);
      const token = getToken('@TOKEN');

      await api.delete(`/lanches/delete/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedList = list.filter((listItem) => listItem.id !== item.id);
      setList(updatedList);

      toast.success(`${item.name} deletado da lista`);
      loadProductData(setList, setWindowLoad);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar o produto.');
    } finally {
      setIsDeleting(false);
      setLoadingCard(false);
    }
  }, [item.id, item.name, list, setList, setLoadingCard]);

  const changeVisibility = useCallback(async () => {
    try {
      setIsChangingVisibility(true);
      setLoadingCard(true);
      const token = getToken('@TOKEN');
      const newVisibility = !visibility;

      await api.patch(
        `/lanches/change/visibility/${item.id}`,
        { visibility: newVisibility },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        newVisibility ? 'Produto visível na lista' : 'Produto ocultado na lista'
      );

      setVisibility(newVisibility);

      loadProductData(setList, setWindowLoad);
    } catch (error) {
      console.error('Erro ao alterar visibilidade:', error);
      toast.error('Erro ao alterar visibilidade do produto.');
    } finally {
      setIsChangingVisibility(false);
      setLoadingCard(false);
      setWindowLoad(false);
    }
  }, [item.id, visibility, setVisibility, setList, setLoadingCard]);

  const handleEdit = (id) => {
    navigate(`/edit/product/${id}`);
  };

  return (
    <div className={styles.contentBox}>
      {user?.role === 'admin' && (
        <>
          <button
            type="button"
            onClick={() => handleEdit(item.id)}
            className={styles.edit}
            disabled={isDeleting || isChangingVisibility}
          >
            <FaPen />
          </button>
          <button
            type="button"
            onClick={changeVisibility}
            className={styles.hide}
            disabled={isChangingVisibility}
          >
            {visibility ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
          <button
            type="button"
            onClick={deleteItem}
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
