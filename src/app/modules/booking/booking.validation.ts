import { z } from 'zod';

const bookingValidationSchema = z.object({
  userId: z.string().optional(),
  bikeId: z.string().min(1, { message: 'Bike Id is required' }),
  startTime: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date string',
    })
    .transform((val) => new Date(val)),
  returnTime: z
    .string()
    .optional()
    .transform((string) => (string ? new Date(string) : null)),
  totalCost: z.number().optional().default(0),
  isReturned: z.boolean().optional().default(false),
});

export const bookingValidation = {
  bookingValidationSchema,
};
