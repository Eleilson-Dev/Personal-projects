import { z } from 'zod';

export const drinkSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z
    .string()
    .min(1, 'O preço é obrigatório')
    .refine((value) => !isNaN(Number(value.replace(',', '.'))), {
      message: 'Preço deve ser um número válido',
    })
    .transform((value) => parseFloat(value.replace(',', '.'))),
  size: z.string().min(1, 'Tamanho é obrigatório'),
});
