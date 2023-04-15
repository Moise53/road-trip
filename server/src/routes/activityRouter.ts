import express, { Router } from 'express';
import ActivityController from '../controllers/activityController';

const activityRouter: Router = express.Router();

activityRouter.get('/', ActivityController.getAllActivities);
activityRouter.get('/:id', ActivityController.getActivityById);
activityRouter.get('/destination/:id', ActivityController.getActivitiesByDestinationId);
activityRouter.delete('/:id', ActivityController.deleteActivity);
activityRouter.put('/:id', ActivityController.updateActivity);
activityRouter.post('/', ActivityController.createActivity);


export default activityRouter;