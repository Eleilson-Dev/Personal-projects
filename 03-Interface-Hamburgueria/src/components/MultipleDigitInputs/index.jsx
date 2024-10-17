import styles from './styles.module.css';

import { useState } from 'react';

export const MultipleDigitInputs = ({ validate, inputsRef }) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  const handleInputChange = async (index, value) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < digits.length - 1) {
        inputsRef.current[index + 1].focus();
      }

      if (newDigits.every((digit) => digit !== '')) {
        await validate(newDigits.join(''));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
    </form>
  );
};
