import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFountRoutes = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statuseCode: httpStatus.NOT_FOUND,
    message: 'Route Not Found',
  });
};

export default notFountRoutes;
