import bcrypt from 'bcrypt';
import { TSignupUser } from './auth.interface';
import config from '../../config';
import { User } from '../user/user.model';
import AppError from '../../../errors/appError';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

// for user sign up functionality in services
const userSignUpIntoDB = async (payload: TSignupUser) => {
  // convert the plain password into the hash password
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.BRYCPT_SLAT),
  );
  payload.password = hashPassword;

  const result = await User.create(payload);
  console.log(result);

  // removing password field while sending the response
  const removeField = result.toObject();
  const { password, ...remainingUserData } = removeField;

  return remainingUserData;
};

// user login functionality

const userLoginIntoDB = async (payload: TSignupUser) => {
  // checking the user exist or not
  const user = await User.findOne({ email: payload?.email });
  // console.log('user32', user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // check the password is correct or not

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user.password,
  );

  // console.log('password', payload?.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'password is not correct ');
  }

  // removing the password,createdAt,updatedAt field in response

  const removeFields = user.toObject();
  const { ...remainingData } = removeFields;
  // console.log(password, createdAt, updatedAt);
  // create jwt token and send to the client

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accesToken = jwt.sign(jwtPayload, config.jwt_acces_secret as string, {
    expiresIn: '40d',
  });
  return { token: accesToken, remainingData };
};

export const AuthServices = {
  userSignUpIntoDB,
  userLoginIntoDB,
};
