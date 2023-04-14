import { Request, Response } from 'express';
import DestinationService from '../services/DestinationService';
import Destination from '../types/destination';

class DestinationController {
    async createDestination(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await DestinationService.create(req.body);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }
    async getAllDestinations(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await DestinationService.getAll();

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getDestinationById(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await DestinationService.getById(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async deleteDestination(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await DestinationService.delete(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async updateDestination(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await DestinationService.update(Number(req.params.id), req.body);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

}

export default new DestinationController();