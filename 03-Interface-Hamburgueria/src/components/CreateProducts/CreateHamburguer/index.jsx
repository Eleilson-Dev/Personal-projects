import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../../hooks/useUserContext';
import { Input } from '../../../fragments/Input';
import { Loading } from '../../../components/Loading';
import { productSchema } from '../../../schemas/userRegisterSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct } from '../../../utils/createProduct';
import { useLists } from '../../../hooks/useLists';

export const CreateHamburguer = () => {
  const { loadingState, setLoadingState } = useUserContext();
  const { setBurgersList } = useLists();
  const { productType } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const submitForm = (data) => {
    const ingredientsArray = data.ingredients.map((ingredient) =>
      ingredient.trim()
    );

    const priceFormatted =
      typeof data.price === 'number'
        ? data.price.toString().replace('.', ',')
        : data.price.replace(',', '.');

    const formData = {
      ...data,
      categoryId: 1,
      ingredients: ingredientsArray,
      price: Number(priceFormatted),
    };

    const requestConfig = {
      setList: setBurgersList,
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
            id="description"
            type="text"
            title="Descrição"
            placeholder={`Sobre a ${productType}`}
            error={errors.description?.message}
            register={register}
          />
          <Input
            id="ingredients"
            type="text"
            title="Ingredientes"
            placeholder="Ex (pão, queijo, tomate)"
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
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
};
