import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../../hooks/useUserContext';
import { Input } from '../../../fragments/Input';
import { Loading } from '../../Loading';
import { drinkSchema } from '../../../schemas/drinkSchema.chema';
import { useParams } from 'react-router-dom';
import { createProduct } from '../../../utils/createProduct';
import { useLists } from '../../../hooks/useLists';
import { useState } from 'react';
import { WindowLoad } from '../../WindowLoad';
import { imageValidator } from '../../../utils/imageValidation';
import { ChangeImage } from '../../../fragments/ChangeImage';

export const CreateSoda = () => {
  const { loadingState, setLoadingState, windowLoad } = useUserContext();
  const { setLists } = useLists();
  const { productType } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [hasImg, setHasImg] = useState(null);

  const category = `${productType}s`;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(drinkSchema) });

  const submitForm = async (data) => {
    await imageValidator(setError, clearErrors, setHasImg, imageFile);

    const formData = {
      ...data,
      categoryName: category,
      image: imageFile,
    };

    const requestConfig = {
      listName: 'sodasList',
      setLists,
      setLoadingState,
      productData: formData,
      endPoint: category,
      setHasImg,
      setImageFile,
      reset,
    };

    createProduct(requestConfig);
  };

  return (
    <div className={styles.centralize}>
      {windowLoad ? (
        <WindowLoad />
      ) : (
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.formContent}
        >
          {loadingState.formLoad && <Loading />}
          <header>
            <h1>
              Cadastrar <span>{productType}</span>
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
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
};
