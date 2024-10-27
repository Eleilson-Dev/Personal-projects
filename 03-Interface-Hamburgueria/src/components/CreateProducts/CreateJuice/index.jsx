import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../../hooks/useUserContext';
import { Input } from '../../../fragments/Input';
import { Loading } from '../../Loading';
import { drinkSchema } from '../../../schemas/product.schema';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct } from '../../../utils/createProduct';
import { useLists } from '../../../hooks/useLists';

export const CreateJuice = () => {
  const { loadingState, setLoadingState } = useUserContext();
  const { setJuicesList } = useLists();
  const { productType } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(drinkSchema) });

  const submitForm = (data) => {
    const priceFormatted =
      typeof data.price === 'number'
        ? data.price.toString().replace(',', '.')
        : data.price.toString();

    const formData = {
      ...data,
      categoryId: 5,
      price: Number(priceFormatted),
    };

    const requestConfig = {
      setList: setJuicesList,
      setLoadingState,
      productData: formData,
      endPoint: `${productType}s`,
      navigate,
    };

    createProduct(requestConfig);
    reset();
  };

  return (
    <div className={styles.centralize}>
      {loadingState.windowLoad ? (
        <div className="windowLoad">
          <Loading />
        </div>
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
