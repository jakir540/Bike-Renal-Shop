import httpStatus from 'http-status';
import AppError from '../../../errors/appError';
import { Bike } from '../bike/bike.model';
import { Request } from 'express';
import mongoose from 'mongoose';
import { Booking } from './booking.model';

const createBookingIntoDB = async (req: Request) => {
  const bookingInfo = req.body;

  // check the DB bike is in or not

  const isBikeExists = await Bike.findById(bookingInfo.bikeId);

  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'bike is not found');
  }

  // check the bike is available or not
  const isBikeAvailable = isBikeExists.isAvailable;
  if (!isBikeAvailable) {
    throw new AppError(httpStatus.FORBIDDEN, 'bike is already rented');
  }
  // get the user id ,email and role from auth
  const authUser = req.user;

  // set the user info into rental info

  bookingInfo.userId = authUser.userId;

  // for more than one write operation uses transaction and rolleback session

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set bike not available operation 01

    const setBikeNotAvailable = await Bike.findByIdAndUpdate(
      bookingInfo.bikeId,
      { isAvailable: false },
      session,
    );

    if (!setBikeNotAvailable) {
      throw new AppError(
        httpStatus.NOT_MODIFIED,
        'Failed To Update Bike Availability',
      );
    }

    // create rental operation 02
    const result = await Booking.create([bookingInfo], { session: session });

    if (!result) {
      throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Failed to create rental');
    }

    // commit transaction
    await session.commitTransaction();
    // end transaction

    await session.endSession();

    return result;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Failed to create rental');
  }
};

// return booking rental
const returnRentalIntoDB = async() > {};

// return booking rental
const getAllRentalOfUserIntoDB = async (req: Request) => {
  // get the sign in user Id,emai and role from auth
  const authUser = req.user;
  const RentalUser = await Booking.find({ userId: authUser.userId });
  return RentalUser;
};

export const BookingServices = {
  createBookingIntoDB,
  returnRentalIntoDB,
  getAllRentalOfUserIntoDB,
};
