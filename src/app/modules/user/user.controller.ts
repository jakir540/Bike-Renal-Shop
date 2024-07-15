import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserIntoDB();

    res.status(200).json({
      success: true,
      message: 'User is get succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
};
