import { Request, Response } from 'express';
import ActivityService from '../services/ActivityService';
import Activity from '../types/activity';

class ActivityController {
    async createActivity(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await ActivityService.create(req.body);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getAllActivities(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await ActivityService.getAll();

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getActivityById(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await ActivityService.getById(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getActivitiesByDestinationId(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await ActivityService.getByDestinationId(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async deleteActivity(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await ActivityService.delete(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async updateActivity(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await ActivityService.update(Number(req.params.id), req.body);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

}

export default new ActivityController();