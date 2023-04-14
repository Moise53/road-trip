import { Request, Response } from 'express';
import GoogleService from '../services/GoogleService';

class SearchController {
    async searchPlaces(req: Request, res: Response): Promise<void> {
        const { lat, lng, radius, type, keyword, rating, rankBy, price } = req.query;

        if (!lat || !lng || !radius || !type) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { data: results, error, message, statusCode } = await GoogleService.getNearbyPlaces(
            Number(lat),
            Number(lng),
            Number(radius),
            type as string,
            keyword as string,
            rating as string,
            rankBy as string,
            price as string
        );

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, results, total: results.length });
    }

    async getPlaceDetails(req: Request, res: Response): Promise<void> {
        const { placeId } = req.params;

        if (!placeId) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { data: result, error, message, statusCode } = await GoogleService.getPlaceDetails(placeId as string);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, result });
    }
}

export default new SearchController();