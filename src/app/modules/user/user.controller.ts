import { Request, Response } from 'express';
import { UserServices } from './user.services';
import catchAsync from '../../utiles/catchAsync';
import sendResponse from '../../utiles/sendResponse';
import httpStatus from 'http-status';

// get profile form DB
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getProfileIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrived succesfully',
    data: result,
  });
});

// update profile into db

const updateProfile = async (req: Request, res: Response) => {
  const result = await UserServices.updateProfileIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile update succesfully',
    data: result,
  });
};

export const UserControllers = {
  getProfile,
  updateProfile,
};
