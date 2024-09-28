import styles from './styles.module.scss';
import { FormRegister } from '../../components/FormRegister';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../hooks/useUserContext';

export const Register = () => {
  const { formLoad } = useUserContext();

  return (
    <main>
      <div className={styles.formBox}>
        <div className={styles.boxContent}>
          <h1>Cadastre-se</h1>
          {formLoad && <Loading />}
          <FormRegister />
        </div>
      </div>
    </main>
  );
};
