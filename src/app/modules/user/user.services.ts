import { Request } from 'express';
import { User } from './user.model';
import AppError from '../../../errors/appError';
import httpStatus from 'http-status';

const getProfileIntoDB = async (req: Request) => {
  // get in user from req , set user in req in auth from jwt payload
  const user = req.user;

  // find user in db using email
  const isUserExists = await User.findOne({ email: user.email });
  // console.log('user exist user 09', isUserExists);

  //show error if don'T find the user

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found ');
  }

  // remove the password field in res
  const removeFields = isUserExists?.toObject();
  const { password, ...remainingData } = removeFields;
  return remainingData;
};

// update profile into db

const updateProfileIntoDB = async (req: Request) => {
  // updating email and password from user

  if (req.body.email || req.body.password) {
    throw new AppError(httpStatus.FORBIDDEN, 'updating emai and password id ');
  }

  // get profile form req

  const user = req.user;
  const isUserExists = await User.findOne({ email: user.email });
  // throw error if don't have user
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  // update profile using email
  const updateProfile = await User.findOneAndUpdate(
    { email: user?.email },
    req.body,
    {
      new: true,
    },
  );

  // show error if don't update profile
  if (!updateProfile) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User profile is not updated successfully',
    );
  }

  //remove password field in res

  const removePass = updateProfile?.toObject();
  const { password, ...remainingData } = removePass;

  return remainingData;
};

export const UserServices = {
  getProfileIntoDB,
  updateProfileIntoDB,
};
