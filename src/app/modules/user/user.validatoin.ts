import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be string',
  }),
  password: z
    .string({
      invalid_type_error: 'password must be a string',
    })
    .max(20, { message: 'Password can not be more than 20 character' })
    .optional(),
  email: z.string({
    invalid_type_error: 'email must be string',
  }),
  phone: z.string().min(11, { message: 'phone number minimum 11 ' }),
  address: z.string({
    invalid_type_error: 'address must be string',
  }),
  role: z.enum(['admin', 'user']).default('user'),
});

export default userValidationSchema;