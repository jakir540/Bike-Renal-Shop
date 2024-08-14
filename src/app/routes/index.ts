import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { BikeRoutes } from '../modules/bike/bike.routes';
import { AuthRoutes } from '../modules/auth/auth.router';
import { rentalsRoutes } from '../modules/booking/booking.routes';

const router = Router();

const modulesRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/rentals',
    route: rentalsRoutes,
  },
];

modulesRoute.forEach((route) => router.use(route.path, route.route));

export default router;
