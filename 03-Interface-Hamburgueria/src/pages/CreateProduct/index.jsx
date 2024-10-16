import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../hooks/useUserContext';
import { Input } from '../../fragments/Input';
import { Loading } from '../../components/Loading';
import { productSchema } from '../../schemas/userRegisterSchema';

export const CreateProduct = () => {
  const { formLoad, createProduct, windowLoad } = useUserContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const submitForm = (data) => {
    const ingredientsArray = data.ingredients
      .split(',')
      .map((ingredient) => ingredient.trim());

    const priceFormatted =
      typeof data.price === 'number'
        ? data.price.toString().replace('.', ',')
        : data.price.replace(',', '.');

    const formData = {
      ...data,
      ingredients: ingredientsArray,
      price: Number(priceFormatted),
    };

    createProduct(formData);
    reset();
  };

  return (
    <div className={styles.centralize}>
      {windowLoad ? (
        <div className="windowLoad">
          <Loading />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.formContent}
        >
          {formLoad && <Loading />}
          <header>
            <h1>Cadastrar Hambúrguer</h1>
          </header>
          <Input
            id="name"
            type="text"
            title="Nome"
            placeholder="Nome do produto"
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
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
};
