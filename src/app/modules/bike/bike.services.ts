import httpStatus from 'http-status';
import AppError from '../../../errors/appError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';
// create bike
const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

//get all bikes
const getAllBikesIntoDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikesIntoDB = async (id: string, updatedData: TBike) => {
  const bike = await Bike.findById(id);
  // if didnot get bike throw error
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'bike is not exist in DB');
  }
  // update bike
  const updateBike = await Bike.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // if not updated bike data show error
  if (!updateBike) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'could not updated bike');
  }
  return updateBike;
};

// delete Bike
const deleteBikesIntoDB = async (id: string) => {
  const bike = await Bike.findByIdAndUpdate(id, { isAvailable: false });

  // if didno't get bike then show error
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'bike is not exist in DB');
  }
  const delelteBike = await Bike.findByIdAndDelete(id);
  // if didno't delelteBike bike then show error
  if (!delelteBike) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'could not delete bike');
  }
  return delelteBike;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesIntoDB,
  updateBikesIntoDB,
  deleteBikesIntoDB,
};
