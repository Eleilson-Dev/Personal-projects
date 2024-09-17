import styles from './styles.module.scss';
import { FormRegister } from '../../components/FormRegister';

export const Register = () => {
  return (
    <main className={styles.formBox}>
      <div className={styles.boxContent}>
        <h1>Cadastre-se</h1>
        <FormRegister />
      </div>
    </main>
  );
};