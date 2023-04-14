"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleService_1 = __importDefault(require("../services/GoogleService"));
class SearchController {
    async searchPlaces(req, res) {
        const { lat, lng, radius, type, keyword, rating, rankBy, price } = req.query;
        if (!lat || !lng || !radius || !type) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }
        const { data: results, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(Number(lat), Number(lng), Number(radius), type, keyword, rating, rankBy, price);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, results, total: results.length });
    }
    async getPlaceDetails(req, res) {
        const { placeId } = req.params;
        if (!placeId) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }
        const { data: result, error, message, statusCode } = await GoogleService_1.default.getPlaceDetails(placeId);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, result });
    }
}
exports.default = new SearchController();
