import { Request, Response } from 'express';
import catchAsync from '../../utiles/catchAsync';
import sendResponse from '../../utiles/sendResponse';
import httpStatus from 'http-status';
import { BookingServices } from './booking.services';

// for created booking system
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookingIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'booking created successfully ',
    data: result,
  });
});

// for return booking

const returnRental = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.returnRentalIntoDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully ',
    data: result,
  });
});

// for all get booking rental of user
const getAllRentalsForUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllRentalOfUserIntoDB(req.body);

  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'not data found',
      data: result,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental retrived successfully ',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  returnRental,
  getAllRentalsForUser,
};
