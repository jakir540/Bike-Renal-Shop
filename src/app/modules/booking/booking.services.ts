import httpStatus from 'http-status';
import AppError from '../../../errors/appError';
import { Bike } from '../bike/bike.model';
import { Request } from 'express';
import mongoose from 'mongoose';
import { Booking } from './booking.model';

const createBookingIntoDB = async (req: Request) => {
  const bookingInfo = req.body;

  console.log('booking services bookininfo', bookingInfo);

  // check the DB bike is in or not

  const isBikeExists = await Bike.findById(bookingInfo.bikeId);
  console.log({ isBikeExists });
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
  console.log({ bookingInfo });

  // for more than one write operation uses transaction and rolleback session

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set bike not available operation 01

    const setBikeNotAvailable = await Bike.findByIdAndUpdate(
      bookingInfo.bikeId,
      { isAvailable: false },
      { new: true, session },
    );

    if (!setBikeNotAvailable) {
      throw new AppError(
        httpStatus.NOT_MODIFIED,
        'Failed To Update Bike Availability',
      );
    }

    // create rental operation 02
    const result = await Booking.create([bookingInfo], { session });

    if (!result) {
      throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Failed to create rental');
    }

    // commit transaction
    await session.commitTransaction();
    // end transaction

    await session.endSession();

    return result;
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Failed to create rental');
  }
};

// return booking rental
const returnRentalIntoDB = async (id: string) => {
  // check the bike exists or not
  console.log('id service', id);
  const isBookingBikeExits = await Booking.findById(id);
  console.log(isBookingBikeExits);

  if (!isBookingBikeExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking bike not found');
  }

  // get the bike
  const bike = await Bike.findById(isBookingBikeExits.bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'bike not found');
  }

  // get the start time from the booking
  const startTime = new Date(isBookingBikeExits.startTime);
  // return the current time
  const returnTime = new Date();
  if (startTime >= returnTime) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'start time must be before return time',
    );
  }

  const timeDifferent =
    Math.ceil(returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  // taking the price per hour of the bike
  const pricePerHour = bike.pricePerHour;
  //calculate the totla cost
  const totalCost = timeDifferent * pricePerHour;

  // for use session for more than one write operation
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBooking = await Booking.findByIdAndUpdate(
      id,
      {
        returnTime: returnTime,
        totalCost: totalCost,
        isReturned: true,
      },
      {
        new: true,
        session: session,
      },
    );

    // if errro happens when update booking operation

    if (!updateBooking) {
      throw new AppError(
        httpStatus.NOT_IMPLEMENTED,
        'Failed to updating booking rental ',
      );
    }

    // update bike isAvailable to true operatoin 02

    const updateBikeAvailability = await Bike.findByIdAndUpdate(
      isBookingBikeExits.bikeId,
      { isAvailable: true },
    ).session(session);

    if (!updateBikeAvailability) {
      throw new AppError(
        httpStatus.NOT_IMPLEMENTED,
        'Failed to update bike availability',
      );
    }

    //commit transaction

    await session.commitTransaction();
    // end transaction
    await session.endSession();
    return updateBooking;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.NOT_IMPLEMENTED,
      'Failed to updationg return booking',
    );
  }
};

// return booking rental
const getAllRentalOfUserIntoDB = async (req: Request) => {
  // get the sign in user Id,emai and role from auth
  console.log('services...........', req);
  const authUser = req.user;
  console.log('auth user : ', authUser);
  const RentalUser = await Booking.find({ userId: authUser?.userId });
  console.log({ RentalUser });
  return RentalUser;
};

export const BookingServices = {
  createBookingIntoDB,
  returnRentalIntoDB,
  getAllRentalOfUserIntoDB,
};
