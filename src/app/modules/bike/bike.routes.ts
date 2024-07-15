import express from 'express';
import { BikeControllers } from './bike.controllers';

const router = express.Router();

router.post('/', BikeControllers.createBike);
router.get('/', BikeControllers.getAllBikes);
router.patch('/:id', BikeControllers.updateBike);
router.delete('/:id', BikeControllers.deleteBike);

export const BikeRoutes = router;
