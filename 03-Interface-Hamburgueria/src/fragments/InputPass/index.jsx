import { useState } from 'react';
import styles from './styles.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const InputPass = ({ register }) => {
  const [showPass, setShowPass] = useState(false);

  const togglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className={styles.inputBox}>
      <label htmlFor="password">Senha</label>

      <div className={styles.pass}>
        <input
          id="password"
          type={showPass ? 'text' : 'password'}
          placeholder="Digite sua Senha"
          autoComplete="off"
          {...register('password')}
          required
        />
        <button type="button" onClick={togglePass}>
          {showPass ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
    </div>
  );
};
