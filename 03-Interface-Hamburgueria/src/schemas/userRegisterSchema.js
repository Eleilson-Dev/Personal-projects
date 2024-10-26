import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(32, 'A senha deve ter no máximo 32 caracteres'),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Este campo não pode ficar vazio')
    .email('Formato de e-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export const productSchema = z.object({
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

export const userRecoverSchema = z.object({
  email: z
    .string()
    .min(1, 'Este campo não pode ficar vazio')
    .email('Formato de e-mail inválido'),
});

export const resetPasswordSchema = z
  .object({
    new_pass: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(32, 'A senha deve ter no máximo 32 caracteres'),
    confirm_new_pass: z.string(),
  })
  .refine((data) => data.new_pass === data.confirm_new_pass, {
    message: 'As senhas não coincidem',
    path: ['confirm_new_pass'],
  });
