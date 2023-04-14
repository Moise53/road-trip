"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const utils_1 = require("../utils");
const customErrors_1 = require("../errors/customErrors");
const types_1 = require("../types");
const UserService_1 = __importDefault(require("../services/UserService"));
const Auth = async (req, res, next) => {
    try {
        const token = req?.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new customErrors_1.UnauthorizedError('No token provided');
        }
        const decoded = await (0, utils_1.verifyToken)(token);
        const userId = Number(decoded.id);
        const { data: user, error, message, statusCode } = await UserService_1.default.getById(userId);
        if (!user || error || statusCode !== 200) {
            throw new customErrors_1.UnauthorizedError('Invalid token');
        }
        req.user = types_1.User.fromJson(user);
        next();
    }
    catch (error) {
        next(new customErrors_1.UnauthorizedError(error.message));
    }
};
exports.Auth = Auth;
exports.default = exports.Auth;
