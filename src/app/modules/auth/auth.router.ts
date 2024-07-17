import express from 'express';
import { Authcontrollers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
const router = express.Router();

// for signup route

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserValidationSchema),
  Authcontrollers.userSignUp,
);

// for login route
router.post(
  '/login',
  validateRequest(AuthValidation.UserLoginValidationShcema),
  Authcontrollers.userLogin,
);

export const AuthRoutes = router;
