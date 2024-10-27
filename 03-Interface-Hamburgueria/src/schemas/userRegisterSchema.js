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
