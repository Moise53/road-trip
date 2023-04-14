"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (Error, req, res, next) => {
    res.status(Error?.status || 500);
    res.json({
        error: true,
        message: Error?.message || 'Internal Server Error',
    });
};
exports.default = ErrorHandler;
