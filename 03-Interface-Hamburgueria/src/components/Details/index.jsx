import { WhatsAppButton } from '../WhatsAppButton';
import styles from './styles.module.scss';

export const Details = ({ id, size, ingredients, price }) => {
  return (
    <div className={styles.details}>
      <span className={styles.size}>{size}</span>
      <div className={styles.ingredients}>
        <h2>Ingredientes:</h2>
        <ul>
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
        </ul>
      </div>

      <div className={styles.price}>
        <span>
          R$ <strong>{price}</strong>
        </span>
      </div>

      <WhatsAppButton phoneNumber={'98985598696'} message={'Pedido'} />
    </div>
  );
};
