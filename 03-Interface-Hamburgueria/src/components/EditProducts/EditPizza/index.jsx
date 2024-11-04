import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../../hooks/useUserContext';
import { Input } from '../../../fragments/Input';
import { Loading } from '../../Loading';
import { pizzaSchema } from '../../../schemas/pizza.schema';
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

export const EditPizza = () => {
  const { productType, id } = useParams();
  const { loadingState, setLoadingState } = useUserContext();
  const { setPizzasList } = useLists();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [hasImg, setHasImg] = useState(null);
  const [originalImgUrl, setOriginalImgUrl] = useState(null);

  const navigate = useNavigate();
  const cateory = `${productType}s`;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(pizzaSchema) });

  useEffect(() => {
    const requestConfig = {
      id,
      endPoint: cateory,
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
  }, [id, reset, reset, setLoading, setLoadingState]);

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
      setList: setPizzasList,
      endPoint: cateory,
      setLoadingState,
    });

    navigate(`/menu/${cateory}`);
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
            id="description"
            type="text"
            title="Descrição"
            placeholder="Sobre o produto"
            error={errors.description?.message}
            register={register}
          />

          <Input
            id="ingredients"
            type="text"
            title="Ingredientes"
            placeholder="Ex (pão, alface, tomate)"
            error={errors.ingredients?.message}
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
            placeholder="Ex (Médio)"
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
