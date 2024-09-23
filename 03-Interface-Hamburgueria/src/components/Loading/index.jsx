import styles from './styles.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loaderBox}>
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    </div>
  );
};