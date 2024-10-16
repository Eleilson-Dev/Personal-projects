import styles from './styles.module.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../../hooks/useUserContext';
import { Input } from '../../fragments/Input';
import { Loading } from '../../components/Loading';
import { productSchema } from '../../schemas/userRegisterSchema';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { getToken } from '../../utils/tokenActions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditProduct = () => {
  const { id } = useParams();
  const { formLoad, setFormLoad, setWindowLoad, setList } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  useEffect(() => {
    setWindowLoad(true);
    const token = getToken('@TOKEN');
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/lanches/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productData = {
          ...response.data,
          price: response.data.price.toString(),
          ingredients: response.data.ingredients.toString(),
        };

        setProduct(productData);
        reset(productData);
        setWindowLoad(false);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
        navigate('/');
      } finally {
        setLoading(false);
        setWindowLoad(false);
      }
    };

    fetchProduct();
  }, [id, navigate, reset]);

  const updateProduct = async (productUpdateData) => {
    try {
      setFormLoad(true);
      setList([]);
      const token = getToken('@TOKEN');

      await api.patch(`/lanches/edit/product/${id}`, productUpdateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Produto editado');
    } catch (err) {
      console.log('Erro ao tentar editar o produto', err);
    } finally {
      setFormLoad(false);
    }
  };

  const submitForm = async (data) => {
    const ingredientsString = data.ingredients.join(', ');
    const ingredientsArray = ingredientsString
      .split(',')
      .map((ingredient) => ingredient.trim());

    const priceFormatted =
      typeof data.price === 'number'
        ? data.price.toString()
        : data.price.replace(',', '.');

    const formData = {
      ...data,
      ingredients: ingredientsArray,
      price: Number(priceFormatted),
    };

    await updateProduct(formData);
    navigate('/');
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
          {formLoad && <Loading />}
          <header>
            <h1>Editar Hambúrguer</h1>
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
          <button type="submit" disabled={formLoad}>
            Salvar
          </button>
        </form>
      )}
    </div>
  );
};
