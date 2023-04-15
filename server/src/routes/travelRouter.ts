import express, { Router } from 'express';
import TravelController from '../controllers/travelController';

const travelRouter: Router = express.Router();

travelRouter.post('/', TravelController.createTravel);
travelRouter.get('/', TravelController.getAllTravels);
travelRouter.get('/:id', TravelController.getTravelById);
travelRouter.delete('/:id', TravelController.deleteTravel);

export default travelRouter;