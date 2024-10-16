import styles from './styles.module.css';

export const Input = ({ id, type, title, placeholder, register, error }) => {
  return (
    <div className={styles.inputConteiner}>
      <label htmlFor={id}>
        {title} {error && <strong>: {error}</strong>}
      </label>

      <div className={styles.inputBox}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...register(id)}
        />
      </div>
    </div>
  );
};
