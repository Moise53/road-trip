"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AxiosRequestHandler {
    async get(url) {
        try {
            const result = await axios_1.default.get(url);
            return result.data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
}
