import styles from './styles.module.css';

export const Button = ({ type, btnText }) => {
  return (
    <button className={styles.btn} type={type}>
      {btnText}
    </button>
  );
};
