import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'email is required' }),
  password: z.string().min(1, { message: 'password is required' }),
  phone: z.string().min(1, { message: 'phone is required' }),
  address: z.string().min(1, { message: 'address is required' }),
  role: z.enum(['admin', 'user']).optional(),
});

const UserLoginValidationShcema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid Email' })
    .min(1, { message: 'email is required' }),
  password: z.string().min(1, { message: 'password is required' }),
});

export const AuthValidation = {
  UserLoginValidationShcema,
  createUserValidationSchema,
};
