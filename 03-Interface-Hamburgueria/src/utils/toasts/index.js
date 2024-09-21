import { toast } from 'react-toastify';
import './toasts.styles.scss';

export const successToast = (successMessage) => {
  return toast.success(successMessage, {
    className: 'toast-custom-success',
    autoClose: 5000,
    toastId: 'successToast',
  });
};

export const errorToast = (errorMessage) => {
  return toast.error(errorMessage, {
    className: 'toast-custom-error',
    autoClose: 5000,
    toastId: 'errorToast',
  });
};
