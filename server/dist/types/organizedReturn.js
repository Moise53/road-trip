"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrganizedReturn {
    constructor(data, error, message, statusCode) {
        this.data = data;
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
    }
    toJson() {
        return {
            data: this.data,
            error: this.error,
            message: this.message,
            statusCode: this.statusCode
        };
    }
}
exports.default = OrganizedReturn;
