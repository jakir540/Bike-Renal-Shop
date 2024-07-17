import { z } from 'zod';

export const bookingValidationSchema = z.object({
  userId: z
    .string({
      invalid_type_error: 'userId must be a string',
    })
    .optional(),
  bikeId: z
    .string({
      invalid_type_error: 'bikeId must be a string',
    })
    .min(1, { message: 'Bike id is required' }),
  startTime: z.string({
    invalid_type_error: 'startTime must be a string',
  }),
  returnTime: z
    .string({
      invalid_type_error: 'returnTime must be a string',
    })
    .optional(),
  totalCost: z.number({
    invalid_type_error: 'totalCost must be a number',
  }),
  isReturned: z
    .boolean({
      invalid_type_error: 'isReturned must be a boolean',
    })
    .default(false),
});

export const UpdateBookingValidationSchema = z.object({
  body: z.object({
    userId: z
      .string({
        invalid_type_error: 'userId must be a string',
      })
      .optional(),
    bikeId: z
      .string({
        invalid_type_error: 'bikeId must be a string',
      })
      .optional(),
    startTime: z
      .string({
        invalid_type_error: 'startTime must be a string',
      })
      .optional(),
    returnTime: z
      .string({
        invalid_type_error: 'returnTime must be a string',
      })
      .optional(),
    totalCost: z
      .number({
        invalid_type_error: 'totalCost must be a number',
      })
      .optional(),
    isReturned: z
      .boolean({
        invalid_type_error: 'isReturned must be a boolean',
      })
      .default(false)
      .optional(),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  UpdateBookingValidationSchema,
};
