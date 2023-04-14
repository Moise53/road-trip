"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleAPIKey = exports.verifyToken = exports.isIdValid = exports.isEmailValid = void 0;
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function isEmailValid(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if ((0, lodash_1.isNil)(email) || email === '' || email === ' ' || !emailRegex.test(email)) {
        return false;
    }
    return true;
}
exports.isEmailValid = isEmailValid;
function isIdValid(id) {
    if ((0, lodash_1.isNil)(id) || id === '' || id === ' ' || (0, lodash_1.isNaN)(Number(id))) {
        return false;
    }
    return true;
}
exports.isIdValid = isIdValid;
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
}
exports.verifyToken = verifyToken;
function getGoogleAPIKey() {
    return process.env.GOOGLE_API_KEY;
}
exports.getGoogleAPIKey = getGoogleAPIKey;
