"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const user_1 = __importDefault(require("../types/user"));
class AuthController {
    async userSignup(req, res) {
        const user = user_1.default.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, data });
    }
    async userLogin(req, res) {
        const user = user_1.default.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService_1.default.login(user);
        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }
        res.status(statusCode).json({ message, token: data.token, user: data.user });
    }
}
exports.default = new AuthController();
