import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../../hooks/useUserContext';
import { Input } from '../../../fragments/Input';
import { Loading } from '../../Loading';
import { drinkSchema } from '../../../schemas/product.schema';
import { useParams } from 'react-router-dom';
import { getToken } from '../../../utils/tokenActions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProduct } from '../../../utils/fetchProduct';
import { useLists } from '../../../hooks/useLists';
import { updateProduct } from '../../../utils/updateProduct';

export const EditSoda = () => {
  const { productType, id } = useParams();
  const { loadingState, setLoadingState } = useUserContext();
  const { setSodasList } = useLists();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
  const endPoint = `${productType}s`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(drinkSchema) });

  useEffect(() => {
    const requestConfig = {
      id,
      endPoint,
      token: getToken('@TOKEN'),
      setProduct,
      reset,
      navigate,
      setLoading,
      setLoadingState,
    };

    const load = async () => {
      await fetchProduct(requestConfig);
    };

    load();
  }, [id, navigate, reset, fetchProduct]);

  const submitForm = async (formData) => {
    const priceFormatted =
      typeof formData.price === 'number'
        ? formData.price.toString()
        : formData.price.replace(',', '.');

    const productUpdateData = {
      ...formData,
      price: Number(priceFormatted),
    };

    await updateProduct(
      id,
      productUpdateData,
      setSodasList,
      endPoint,
      setLoadingState
    );

    navigate(`/menu/${endPoint}`);
  };

  return (
    <div className={styles.centralize}>
      {loading ? (
        <Loading />
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
