"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityService_1 = __importDefault(require("../services/ActivityService"));
class ActivityController {
    async createActivity(req, res) {
        const { data, error, message, statusCode } = await ActivityService_1.default.create(req.body);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async getAllActivities(req, res) {
        const { data, error, message, statusCode } = await ActivityService_1.default.getAll();
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async getActivityById(req, res) {
        const { data, error, message, statusCode } = await ActivityService_1.default.getById(Number(req.params.id));
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async deleteActivity(req, res) {
        const { data, error, message, statusCode } = await ActivityService_1.default.delete(Number(req.params.id));
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async updateActivity(req, res) {
        const { data, error, message, statusCode } = await ActivityService_1.default.update(Number(req.params.id), req.body);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
}
exports.default = new ActivityController();
