import styles from './styles.module.css';

export const Input = ({ id, labelText, type, placeHolder, register }) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={type} placeholder={placeHolder} {...register(id)} />
    </div>
  );
};
