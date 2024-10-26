import { api } from '../../services/api';

export const fetchLoadData = async (requestConfig) => {
  const { setList, token, endPoint, load, setLoadingState } = requestConfig;

  try {
    setList([]);
    setLoadingState((prev) => ({ ...prev, windowLoad: load }));

    const { data } = await api.get(`/${endPoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setList(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoadingState((prev) => ({ ...prev, windowLoad: false }));
  }
};
