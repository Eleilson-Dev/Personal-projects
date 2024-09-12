import styles from './styles.module.scss';

export const WhatsAppButton = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <button className={styles.btn} style={styles.button}>
        Fazer Pedido
      </button>
    </a>
  );
};
