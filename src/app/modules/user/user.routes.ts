import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validatoin';

const router = express.Router();

// router.post('/signup', UserControllers.createUser);
// router.get('/user', UserControllers.createUser);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getProfile,
);

router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidation.UpdateUserValidationSchema),
  UserControllers.updateProfile,
);

export const UserRoutes = router;
