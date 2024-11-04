import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../../hooks/useUserContext';
import { Input } from '../../../fragments/Input';
import { Loading } from '../../Loading';
import { drinkSchema } from '../../../schemas/drinkSchema.chema';
import { useParams } from 'react-router-dom';
import { getToken } from '../../../utils/tokenActions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProduct } from '../../../utils/fetchProduct';
import { useLists } from '../../../hooks/useLists';
import { updateProduct } from '../../../utils/updateProduct';
import { WindowLoad } from '../../WindowLoad';
import { imageValidator } from '../../../utils/imageValidation';
import { ChangeImage } from '../../../fragments/ChangeImage';

export const EditSoda = () => {
  const { productType, id } = useParams();
  const { loadingState, setLoadingState } = useUserContext();
  const { setSodasList } = useLists();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [hasImg, setHasImg] = useState(null);
  const [originalImgUrl, setOriginalImgUrl] = useState(null);

  const navigate = useNavigate();
  const category = `${productType}s`;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(drinkSchema) });

  useEffect(() => {
    const requestConfig = {
      id,
      endPoint: category,
      token: getToken('@TOKEN'),
      setOriginalImgUrl,
      setHasImg,
      reset,
      setLoading,
      setLoadingState,
    };

    const load = async () => {
      await fetchProduct(requestConfig);
    };

    load();
  }, [id, category, reset, setLoading, setLoadingState]);

  const submitForm = async (formData) => {
    if (imageFile || (hasImg && hasImg !== originalImgUrl)) {
      await imageValidator(setError, clearErrors, setHasImg, imageFile);
    }

    const productUpdateData = {
      ...formData,
      image: imageFile,
    };

    await updateProduct({
      id,
      productUpdateData,
      setList: setSodasList,
      endPoint: category,
      setLoadingState,
    });

    navigate(`/menu/${category}`);
  };

  return (
    <div className={styles.centralize}>
      {loading ? (
        <WindowLoad />
      ) : (
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.formContent}
        >
          {loadingState.formLoad && <Loading />}
          <header>
            <h1>
              Editar <span>{productType}</span>
            </h1>
          </header>
          <ChangeImage
            id="image"
            hasImg={hasImg}
            setHasImg={setHasImg}
            setImageFile={setImageFile}
            title="Selecione uma imagem"
            error={errors.image?.message}
          />
          <Input
            id="name"
            type="text"
            title="Nome"
            placeholder={`Nome do ${productType}`}
            error={errors.name?.message}
            register={register}
          />
          <Input
            id="price"
            type="text"
            title="Preço R$"
            placeholder="0,00"
            error={errors.price?.message}
            register={register}
          />
          <Input
            id="size"
            type="text"
            title="Tamanho"
            placeholder="Ex (300ml)"
            error={errors.size?.message}
            register={register}
          />
          <button type="submit" disabled={loadingState.formLoad}>
            Salvar
          </button>
        </form>
      )}
    </div>
  );
};
