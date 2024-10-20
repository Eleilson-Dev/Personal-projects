import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FaPen } from 'react-icons/fa';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';
import { api } from '../../services/api';
import { getToken } from '../../utils/tokenActions';
import { useUserContext } from '../../hooks/useUserContext';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchLoadData } from '../../utils/fetchLoadData';

export const ProductActions = ({ item, visibility, setVisibility }) => {
  const { user, primaryMenu, setPrimaryMenu, setLoadingState, dataProps } =
    useUserContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingVisibility, setIsChangingVisibility] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setVisibility(item.visibility);
  }, [item.visibility, setVisibility, setPrimaryMenu]);

  const deleteItem = useCallback(
    async (id) => {
      const requestConfig = {
        setList: setPrimaryMenu,
        token: getToken('@TOKEN'),
        endPoint: 'hamburguers',
        load: false,
        setLoadingState,
      };

      try {
        setIsDeleting(true);
        dataProps.setloadToDelete(id);
        const token = getToken('@TOKEN');

        await api.delete(`/hamburguers/delete/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedList = primaryMenu.filter(
          (listItem) => listItem.id !== item.id
        );

        setPrimaryMenu(updatedList);

        toast.success(`${item.name} deletado da lista`);
        await fetchLoadData(requestConfig);
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar o produto.');
      } finally {
        setIsDeleting(false);
        dataProps.setloadToDelete(null);
      }
    },
    [item.id, item.name, primaryMenu, setPrimaryMenu]
  );

  const changeVisibility = useCallback(
    async (id) => {
      try {
        const requestConfig = {
          setList: setPrimaryMenu,
          token: getToken('@TOKEN'),
          endPoint: 'hamburguers',
          load: false,
          setLoadingState,
        };

        setIsChangingVisibility(true);
        dataProps.setloadToDelete(id);
        const token = getToken('@TOKEN');
        const newVisibility = !visibility;

        await api.patch(
          `/hamburguers/change/visibility/${item.id}`,
          { visibility: newVisibility },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success(
          newVisibility
            ? 'Produto visível na lista'
            : 'Produto ocultado na lista'
        );

        setVisibility(newVisibility);

        await fetchLoadData(requestConfig);
      } catch (error) {
        console.error('Erro ao alterar visibilidade:', error);
        toast.error('Erro ao alterar visibilidade do produto.');
      } finally {
        setIsChangingVisibility(false);
        dataProps.setloadToDelete(null);
      }
    },
    [item.id, visibility, setVisibility, setPrimaryMenu]
  );

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
            onClick={() => changeVisibility(item.id)}
            className={styles.hide}
            disabled={isChangingVisibility}
          >
            {visibility ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
          <button
            type="button"
            onClick={() => deleteItem(item.id)}
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
