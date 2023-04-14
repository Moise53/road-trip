"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusCodes {
    static get OK() {
        return this.okCode;
    }
    static get CREATED() {
        return this.createdCode;
    }
    static get NO_CONTENT() {
        return this.noContentCode;
    }
    static get PARTIAL_CONTENT() {
        return this.partialContentCode;
    }
    static get NOT_MODIFIED() {
        return this.notModifiedCode;
    }
    static get BAD_REQUEST() {
        return this.badRequestCode;
    }
    static get UNAUTHORIZED() {
        return this.unauthorizedCode;
    }
    static get FORBIDDEN() {
        return this.forbiddenCode;
    }
    static get NOT_FOUND() {
        return this.notFoundCode;
    }
    static get UNSUPPORTED_MEDIA_TYPE() {
        return this.unsupportedMediaTypeCode;
    }
    static get UNPROCESSABLE_ENTITY() {
        return this.unprocessableEntityCode;
    }
    static get SERVER_ERROR() {
        return this.serverErrorCode;
    }
}
StatusCodes.okCode = 200;
StatusCodes.createdCode = 201;
StatusCodes.noContentCode = 204;
StatusCodes.partialContentCode = 206;
StatusCodes.notModifiedCode = 304;
StatusCodes.badRequestCode = 400;
StatusCodes.unauthorizedCode = 401;
StatusCodes.forbiddenCode = 403;
StatusCodes.notFoundCode = 404;
StatusCodes.unsupportedMediaTypeCode = 415;
StatusCodes.unprocessableEntityCode = 422;
StatusCodes.serverErrorCode = 500;
exports.default = StatusCodes;
