import { RequestHandler } from 'express';
import sendResponse from '../../utiles/sendResponse';
import catchAsyn from '../../utiles/catchAsync';
import httpStatus from 'http-status';
import { BikeServices } from './bike.services';

// create bike into db
const createBike: RequestHandler = catchAsyn(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

// get all bikes into db

const getAllBikes: RequestHandler = catchAsyn(async (req, res) => {
  const result = await BikeServices.getAllBikesIntoDB();
  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'bikes not found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes gets successfully',
    data: result,
  });
});

// updated bike

const updateBike: RequestHandler = catchAsyn(async (req, res) => {
  console.log('request', req.params);
  const id = req.params.id;
  console.log({ id });
  const UpdatedData = req.body;

  const updatedBike = await BikeServices.updateBikesIntoDB(id, UpdatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike is updated successfully',
    data: updatedBike,
  });
});
// for delete bike

const deleteBike: RequestHandler = catchAsyn(async (req, res) => {
  const id = req.params.id;
  const deletedBike = await BikeServices.deleteBikesIntoDB(id);
  // console.log({ deletedBike });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike is delete successfully',
    data: deletedBike,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
