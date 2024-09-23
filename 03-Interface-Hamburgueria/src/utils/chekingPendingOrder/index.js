import { toast } from 'react-toastify';

export const checkingPendingOrder = ({ data, dataProps }) => {
  dataProps.setOrderLoading(false);
  dataProps.setPendingOrder(true);
  toast.warn(data?.message, { autoClose: 500 });
};
