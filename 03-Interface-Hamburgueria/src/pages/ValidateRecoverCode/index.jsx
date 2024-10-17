import styles from './styles.module.css';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { MultipleDigitInputs } from '../../components/MultipleDigitInputs';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../hooks/useUserContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const ValidateRecoverCode = () => {
  const { formLoad, setFormLoad } = useUserContext();
  const [countdown, setCountdown] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(sessionStorage.getItem('@PASS_RESET_EMAIL'));
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
      const userId = sessionStorage.getItem('@PASS_RESET_USER_ID');
      await api.post('/users/resend/recovery/code', { userId });

      setCountdown(60);
      setIsDisabled(true);

      toast.success('Código reenviado');
      setFormLoad(false);
    } catch (error) {
      console.log(error);
      setFormLoad(false);
    }
  };

  const validate = async (code) => {
    try {
      setFormLoad(true);
      const userId = sessionStorage.getItem('@PASS_RESET_USER_ID');
      const userEmail = sessionStorage.getItem('@PASS_RESET_EMAIL');
      const { data } = await api.post('/users/validate/recovery', {
        userId,
        userEmail,
        code,
      });

      sessionStorage.setItem('@TOKEN_RECOVERY', data.accessTokenRecover);
      toast.success('Tudo pronto para redefinir sua senha');
      navigate('/reset/password');
    } catch (err) {
      console.log(err);
    } finally {
      setFormLoad(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.sendCodeContent}>
      <div className={styles.boxContent}>
        <h1>Verifique seu E-mail</h1>
        {formLoad && <Loading />}
        <p>
          Digite o código enviado para <strong>{userEmail}</strong> <br /> para
          redefinir sua senha
        </p>
        <MultipleDigitInputs validate={validate} inputsRef={inputsRef} />
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
