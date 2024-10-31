import styles from './styles.module.css';
import { FaImage } from 'react-icons/fa';

export const ChangeImage = ({
  id,
  hasImg,
  setHasImg,
  setImageFile,
  title,
  error,
}) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHasImg(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }

    event.target.value = null;
  };

  return (
    <div className={styles.choseImg}>
      <label htmlFor={id}>
        {hasImg ? (
          <>
            <div
              className={
                hasImg?.startsWith('http') ? styles.hasUrl : styles.formImg
              }
            >
              {hasImg?.startsWith('http') && <p>Alterar imagem atual ?</p>}
              <img src={hasImg} alt="Preview da imagem" />
            </div>
          </>
        ) : (
          <>
            <FaImage />
            <p>
              {error ? <span className={styles.error}>{error}</span> : title}
            </p>
          </>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </div>
  );
};
