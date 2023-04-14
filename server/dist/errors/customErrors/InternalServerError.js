"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../statusCode"));
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalServer';
        this.status = statusCode_1.default.SERVER_ERROR;
    }
}
exports.default = InternalServerError;
