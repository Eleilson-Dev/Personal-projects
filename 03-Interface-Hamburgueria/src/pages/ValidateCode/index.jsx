import styles from './styles.module.css';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { MultipleDigitInputs } from '../../components/MultipleDigitInputs';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../hooks/useUserContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLists } from '../../hooks/useLists';

export const ValidateCode = () => {
  const { loadingState, setLoadingState, setUser } = useUserContext();
  const { setBurgersList } = useLists();
  const [countdown, setCountdown] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

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

  const validate = async (code) => {
    const userId = sessionStorage.getItem('@USERID');

    try {
      setBurgersList([]);
      setLoadingState((prev) => ({ ...prev, formLoad: true }));
      const response = await api.post('users/register', {
        userId,
        code,
      });

      localStorage.setItem('@TOKEN', response.data.accessToken);
      sessionStorage.removeItem('@USERID');
      const { data } = await api.get(`/users/current`, {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
      });

      toast.success('Usuário cadastrado com sucesso!');
      setUser(data);
      navigate('/');
    } catch (err) {
      console.log(err);

      const { message } = err.response.data;

      if (message === 'TIME_EXPIRED') {
        navigate('/register');
      }

      if (message === 'CODE_EXPIRED') {
        toast.warn('O código expirou');

        setDigits(['', '', '', '', '', '']);

        inputsRef.current.forEach((input) => input.blur());
      }

      if (message === 'the code is not valid') {
        toast.warn('Código inválido');

        setDigits(['', '', '', '', '', '']);

        inputsRef.current.forEach((input) => input.blur());
      }
    } finally {
      setLoadingState((prev) => ({ ...prev, formLoad: false }));
    }
  };

  const resendCode = async () => {
    try {
      setLoadingState((prev) => ({ ...prev, formLoad: true }));
      const userId = sessionStorage.getItem('@USERID');
      await api.post('/users/resend/code', { userId });

      setCountdown(60);
      setIsDisabled(true);

      toast.success('Código reenviado');
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState((prev) => ({ ...prev, formLoad: false }));
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
        {loadingState.formLoad && <Loading />}
        <p>
          Por favor, digite o código que enviamos para
          <strong> {userEmail}</strong>
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
