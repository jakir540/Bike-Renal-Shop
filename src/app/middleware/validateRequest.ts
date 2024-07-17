import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utiles/catchAsync';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
