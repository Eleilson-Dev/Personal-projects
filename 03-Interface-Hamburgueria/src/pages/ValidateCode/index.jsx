import styles from './styles.module.scss';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { MultipleDigitInputs } from '../../components/MultipleDigitInputs';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../hooks/useUserContext';
import { useState, useEffect } from 'react';

export const ValidateCode = () => {
  const { formLoad, setFormLoad } = useUserContext();
  const [countdown, setCountdown] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (countdown === 0) {
      setIsDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const resendCode = async () => {
    try {
      setFormLoad(true);
      const userId = sessionStorage.getItem('@USERID');
      await api.post('/users/resend', { userId });

      setCountdown(60);
      setIsDisabled(true);

      toast.success('Código reenviado');
      setFormLoad(false);
    } catch (error) {
      console.log(error);
      setFormLoad(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Formatação mm:ss
  };

  return (
    <div className={styles.sendCodeContent}>
      <div className={styles.boxContent}>
        {formLoad && <Loading />}
        <h3>Código de verificação</h3>
        <MultipleDigitInputs />
        <button
          className={styles.resendButton}
          onClick={resendCode}
          disabled={isDisabled}
        >
          {isDisabled ? `${formatTime(countdown)}` : 'Reenviar código'}
        </button>
      </div>
    </div>
  );
};
