import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export const MultipleDigitInputs = () => {
  const { setUser, setFormLoad } = useUserContext();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < digits.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const validate = async (code) => {
    const userId = sessionStorage.getItem('@USERID');

    try {
      setFormLoad(true);
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
      setFormLoad(false);
    } catch (err) {
      console.log(err);
      setFormLoad(false);
      const { message } = err.response.data;
      if (message === 'TIME_EXPIRED') {
        navigate('/register');
      }
      if (message === 'CODE_EXPIRED') {
        toast.warn('0 Código expirou');
      }
      console.log(err);
      if (message === 'the code is not valid') {
        toast.warn('Código invalido');
      }
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();

    if (digits.some((digit) => digit === '')) {
      toast.warn('Por favor, preencha todos os dígitos.');
      return;
    }

    inputsRef.current.forEach((input) => input.blur());

    validate(digits.join(''));
    setDigits(['', '', '', '', '', '']);
  };

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <div className={styles.inputs}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            value={digit}
            placeholder="0"
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputMode="numeric"
            maxLength="1"
            autoComplete="disabled"
          />
        ))}
      </div>
      <button className={styles.formButton} type="submit">
        Validar código
      </button>
    </form>
  );
};
