import styles from './styles.module.scss';
import { FormLogin } from '../../components/FormLogin';
import { useUserContext } from '../../hooks/useUserContext';
import { Loading } from '../../components/Loading';

export const Login = () => {
  const { formLoad } = useUserContext();
  return (
    <main>
      <div className={styles.formBox}>
        <div className={styles.boxContent}>
          <h1>Login</h1>
          {formLoad && <Loading />}
          <FormLogin />
        </div>
      </div>
    </main>
  );
};
