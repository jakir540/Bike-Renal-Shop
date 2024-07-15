import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUserIntoDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserIntoDB,
};
