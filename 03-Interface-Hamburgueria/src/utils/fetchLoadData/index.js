import { api } from '../../services/api';

export const fetchLoadData = async (requestConfig) => {
  const { listName, setLists, token, endPoint, setLoading } = requestConfig;

  try {
    setLoading(true);

    const { data } = await api.get(`/${endPoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLists((prevLists) => ({
      ...prevLists,
      [listName]: (prevLists[listName] = data),
    }));
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
