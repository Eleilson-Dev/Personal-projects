import styles from './styles.module.css';
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
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setUserEmail(sessionStorage.getItem('@USEREMAIL'));
  }, [userEmail]);

  useEffect(() => {
    if (countdown === 0) {
      setIsDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, userEmail]);

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
        <h1>Verifique seu E-mail</h1>
        {formLoad && <Loading />}
        <p>
          Por favor, digite o código que enviamos para
          <strong> {userEmail}</strong>
        </p>
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
