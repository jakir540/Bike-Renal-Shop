import express from 'express';
import { BikeControllers } from './bike.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { bikeValidation } from './bike.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidation.bikeValidationSchema),
  BikeControllers.createBike,
);

router.get('/', BikeControllers.getAllBikes);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidation.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
