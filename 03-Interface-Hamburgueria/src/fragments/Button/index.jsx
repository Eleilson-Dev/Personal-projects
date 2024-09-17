import styles from './styles.module.scss';

export const Button = ({ type, btnText }) => {
  return (
    <button className={styles.btn} type={type}>
      {btnText}
    </button>
  );
};
