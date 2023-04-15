import { Request, Response } from 'express';
import TravelService from '../services/TravelService';
import Travel from '../types/travel';

class TravelController {

    async createTravel(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await TravelService.create(req.body as Travel);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getAllTravels(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await TravelService.getAll();

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getTravelById(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await TravelService.getById(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async deleteTravel(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await TravelService.delete(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

}

export default new TravelController();