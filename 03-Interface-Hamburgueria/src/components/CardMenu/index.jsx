import { Details } from '../Details';
import styles from './styles.module.scss';

export const CardMenu = ({ props }) => {
  return (
    <li className={styles.cardItem}>
      <h1>{props.name}</h1>

      <Details
        id={props.id}
        size={props.size}
        ingredients={props.ingredients}
        price={props.price}
      />

      <div className={styles.description}>
        <h1>Descrição</h1>
        <p>{props.description}</p>
      </div>
    </li>
  );
};
