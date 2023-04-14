"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../statusCode"));
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
        this.status = statusCode_1.default.NOT_FOUND;
    }
}
exports.default = NotFoundError;
