export const imageValidator = async (
  setError,
  clearErrors,
  setHasImg,
  file
) => {
  return new Promise((resolve, reject) => {
    const allowedTypes = ['image/png', 'image/jpeg'];
    const maxSizeInMB = 2;

    if (!file) {
      setError('image', {
        type: 'manual',
        message: 'É necessário enviar uma imagem',
      });

      setHasImg(null);
      reject();
    } else if (!allowedTypes.includes(file.type)) {
      setError('image', {
        type: 'manual',
        message: 'Formato de imagem inválido. Use PNG ou JPEG.',
      });

      setHasImg(null);
      reject();
    } else if (file.size / (1024 * 1024) > maxSizeInMB) {
      setError('image', {
        type: 'manual',
        message: `A imagem deve ter no máximo ${maxSizeInMB}MB.`,
      });

      setHasImg(null);
      reject();
    } else {
      clearErrors('image');
      resolve();
    }
  });
};
