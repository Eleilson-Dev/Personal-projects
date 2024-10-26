import { toast } from 'react-toastify';

export const checkingPendingOrder = ({
  data,
  setLoadingState,
  setPendingOrder,
}) => {
  setLoadingState((prev) => ({ ...prev, orderLoading: false }));
  setPendingOrder(true);
  toast.warn(data?.message);
};
