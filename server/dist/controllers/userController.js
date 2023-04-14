"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const user_1 = __importDefault(require("../types/user"));
const utils_1 = require("../utils");
class UserController {
    async getAllUsers(req, res) {
        const { data, error, message, statusCode } = await UserService_1.default.getAll();
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async userSignup(req, res) {
        const user = user_1.default.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async getUserById(req, res) {
        if (!(0, utils_1.isIdValid)(req.params.id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }
        const { data, error, message, statusCode } = await UserService_1.default.getById(Number(req.params.id));
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async updateUser(req, res) {
        if (!(0, utils_1.isIdValid)(req.params.id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }
        const user = user_1.default.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService_1.default.update(Number(req.params.id), user);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async deleteUser(req, res) {
        if (!(0, utils_1.isIdValid)(req.params.id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }
        const { data, error, message, statusCode } = await UserService_1.default.delete(Number(req.params.id));
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
}
exports.default = new UserController();
