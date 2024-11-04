import { z } from 'zod';

export const pizzaSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  ingredients: z
    .string()
    .min(1, 'Ingredientes são obrigatórios')
    .transform((value) =>
      value.split(',').map((ingredient) => ingredient.trim())
    ),
  price: z
    .string()
    .min(1, 'O preço é obrigatório')
    .refine((value) => !isNaN(Number(value.replace(',', '.'))), {
      message: 'Preço deve ser um número válido',
    })
    .transform((value) => parseFloat(value.replace(',', '.'))),
  size: z.string().min(1, 'Tamanho é obrigatório'),
});
