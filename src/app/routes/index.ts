import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { BikeRoutes } from '../modules/bike/bike.routes';

const router = Router();

const modulesRoute = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
];

modulesRoute.forEach((route) => router.use(route.path, route.route));

export default router;
