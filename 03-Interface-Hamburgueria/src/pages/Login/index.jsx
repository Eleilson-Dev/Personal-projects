import styles from './styles.module.scss';
import { FormLogin } from '../../components/FormLogin';

export const Login = () => {
  return (
    <main className={styles.formBox}>
      <div className={styles.boxContent}>
        <h1>Login</h1>
        <FormLogin />
      </div>
    </main>
  );
};
