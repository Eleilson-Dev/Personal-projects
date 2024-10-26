import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const changeProductVisibility = async (
  item,
  list,
  setList,
  setLoadingState,
  setIsChangingVisibility
) => {
  try {
    setIsChangingVisibility(true);
    setLoadingState((prev) => ({ ...prev, loadToDelete: item.id }));
    const token = getToken('@TOKEN');

    const menuItem = list.find((menuItem) => menuItem.id === item.id);
    const newVisibility = !menuItem.visibility;
    const endPoint = item.category.name + 's';

    await api.patch(
      `/${endPoint}/change/visibility/${item.id}`,
      { visibility: newVisibility },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setList((prevMenu) =>
      prevMenu.map((menuItem) =>
        menuItem.id === item.id
          ? { ...menuItem, visibility: newVisibility }
          : menuItem
      )
    );

    toast.success(
      newVisibility ? 'Produto visível na lista' : 'Produto ocultado na lista'
    );
  } catch (error) {
    console.error('Erro ao alterar visibilidade:', error);
    toast.error('Erro ao alterar visibilidade do produto.');
  } finally {
    setIsChangingVisibility(false);
    setLoadingState((prev) => ({ ...prev, loadToDelete: null }));
  }
};
