import httpStatus from 'http-status';
import catchAsync from '../../utiles/catchAsync';
import sendResponse from '../../utiles/sendResponse';
import { AuthServices } from './auth.services';

const userSignUp = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.userSignUpIntoDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Registration is successfully',
    data: result,
  });
});

// for user login
const userLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.userLoginIntoDB(req.body);
  const { token, remainingData } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Logged in successfully',
    token: token,
    data: remainingData,
  });
});

export const Authcontrollers = {
  userSignUp,
  userLogin,
};
