import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const userLoginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  ingredients: z
    .string()
    .min(1, 'Ingredientes são obrigatórios')
    .transform((value) =>
      value.split(',').map((ingredient) => ingredient.trim())
    ), // Transforma a string em um array
  price: z
    .string()
    .min(1, 'O preço é obrigatório')
    .refine((value) => !isNaN(Number(value.replace(',', '.'))), {
      message: 'Preço deve ser um número válido',
    })
    .transform((value) => parseFloat(value.replace(',', '.'))),
  size: z.string().min(1, 'Tamanho é obrigatório'),
});
