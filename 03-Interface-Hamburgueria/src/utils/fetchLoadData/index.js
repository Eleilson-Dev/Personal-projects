import { api } from '../../services/api';

export const fetchLoadData = async (requestConfig) => {
  const { setList, token, endPoint, load, setWindowLoad } = requestConfig;

  try {
    setList([]);
    setWindowLoad(load);

    const { data } = await api.get(`/${endPoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setList(data);
  } catch (err) {
    console.log(err);
  } finally {
    setWindowLoad(false);
  }
};
