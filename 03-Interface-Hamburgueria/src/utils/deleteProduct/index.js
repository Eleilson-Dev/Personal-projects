import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const deleteProduct = async (
  item,
  listName,
  setLists,
  setLoadingState,
  setIsDeleting
) => {
  try {
    setIsDeleting(true);
    setLoadingState((prev) => ({ ...prev, loadToDelete: item.id }));
    const token = getToken('@TOKEN');
    const endPoint = item.category.name;

    await api.delete(`/${endPoint}/delete/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLists((prevLists) => ({
      ...prevLists,
      [listName]: prevLists[listName].filter((menuItem) => {
        return menuItem.id !== item.id;
      }),
    }));

    toast.success(`${item.name} deletado da lista`);
  } catch (error) {
    console.error('Erro ao deletar:', error);
    toast.error('Erro ao deletar o produto.');
  } finally {
    setIsDeleting(false);
    setLoadingState((prev) => ({ ...prev, loadToDelete: null }));
  }
};
