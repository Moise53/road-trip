"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DestinationService_1 = __importDefault(require("../services/DestinationService"));
class DestinationController {
    async createDestination(req, res) {
        const { data, error, message, statusCode } = await DestinationService_1.default.create(req.body);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async getAllDestinations(req, res) {
        const { data, error, message, statusCode } = await DestinationService_1.default.getAll();
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async getDestinationById(req, res) {
        const { data, error, message, statusCode } = await DestinationService_1.default.getById(Number(req.params.id));
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async deleteDestination(req, res) {
        const { data, error, message, statusCode } = await DestinationService_1.default.delete(Number(req.params.id));
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async updateDestination(req, res) {
        const { data, error, message, statusCode } = await DestinationService_1.default.update(Number(req.params.id), req.body);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
}
exports.default = new DestinationController();
