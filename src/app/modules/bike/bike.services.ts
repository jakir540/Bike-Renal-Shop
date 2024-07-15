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

  if (!bike) {
    throw new Error('bike is not exist in DB');
  }
  const updateBike = await Bike.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updateBike) {
    throw new Error('could not updated bike');
  }
  return updateBike;
};

// delete Bike
const deleteBikesIntoDB = async (id: string) => {
  const updatedBike = await Bike.findByIdAndUpdate(id, { isAvailable: false });

  if (!updatedBike) {
    throw new Error('bike is not exist in DB');
  }
  const delelteBike = await Bike.findByIdAndDelete(id);
  if (!delelteBike) {
    throw new Error('could not delele bike');
  }
  return delelteBike;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesIntoDB,
  updateBikesIntoDB,
  deleteBikesIntoDB,
};
