import express, { Router } from 'express';
import DestinationController from '../controllers/destinationController';

const destinationRouter: Router = express.Router();

destinationRouter.get('/', DestinationController.getAllDestinations);
destinationRouter.get('/:id', DestinationController.getDestinationById);
destinationRouter.delete('/:id', DestinationController.deleteDestination);
destinationRouter.put('/:id', DestinationController.updateDestination);
destinationRouter.post('/', DestinationController.createDestination);

export default destinationRouter;