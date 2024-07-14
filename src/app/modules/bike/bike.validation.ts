import { z } from 'zod';

// for validation uses by zod

const bikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be a string',
    }),
    description: z.string({
      invalid_type_error: 'description must be a string',
    }),
    pricePerHour: z.number({
      invalid_type_error: 'pricePerHour must be a number',
    }),
    isAvailable: z
      .boolean({
        invalid_type_error: 'isAvailable must be a boolean',
      })
      .optional(),
    cc: z.number({
      invalid_type_error: 'cc must be a number',
    }),
    year: z.number({
      invalid_type_error: 'year must be a number',
    }),
    model: z.string({
      invalid_type_error: 'model must be a string',
    }),
    brand: z.string({
      invalid_type_error: 'brand must be a string',
    }),
  }),
});

// for update

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be a string',
      })
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: 'pricePerHour must be a number',
      })
      .optional(),
    isAvailable: z
      .boolean({
        invalid_type_error: 'isAvailable must be a boolean',
      })
      .optional(),
    cc: z
      .number({
        invalid_type_error: 'cc must be a number',
      })
      .optional(),
    year: z
      .number({
        invalid_type_error: 'year must be a number',
      })
      .optional(),
    model: z
      .string({
        invalid_type_error: 'model must be a string',
      })
      .optional(),
    brand: z
      .string({
        invalid_type_error: 'brand must be a string',
      })
      .optional(),
  }),
});

export const bikeValidation = {
  bikeValidationSchema,
  updateBikeValidationSchema,
};
