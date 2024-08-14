import express from 'express';
import { BookingControllers } from './booking.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { bookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(bookingValidation.bookingValidationSchema),
  BookingControllers.createBooking,
);

router.put(
  '/:id/return',
  auth(USER_ROLE.admin),
  BookingControllers.returnRental,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BookingControllers.getAllRentalsForUser,
);

export const rentalsRoutes = router;
