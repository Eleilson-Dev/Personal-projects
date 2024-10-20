import { toast } from 'react-toastify';

export const checkingPendingOrder = ({ data, setLoadingState, dataProps }) => {
  setLoadingState((prev) => ({ ...prev, orderLoading: false }));
  dataProps.setPendingOrder(true);
  toast.warn(data?.message);
};
