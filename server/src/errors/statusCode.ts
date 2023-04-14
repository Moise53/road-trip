class StatusCodes {
    static okCode: number = 200;
    static createdCode: number = 201;
    static noContentCode: number = 204;
    static partialContentCode: number = 206;
    static notModifiedCode: number = 304;
    static badRequestCode: number = 400;
    static unauthorizedCode: number = 401;
    static forbiddenCode: number = 403;
    static notFoundCode: number = 404;
    static unsupportedMediaTypeCode: number = 415;
    static unprocessableEntityCode: number = 422;
    static serverErrorCode: number = 500;


    static get OK(): number {
        return this.okCode;
    }

    static get CREATED(): number {
        return this.createdCode;
    }

    static get NO_CONTENT(): number {
        return this.noContentCode;
    }

    static get PARTIAL_CONTENT(): number {
        return this.partialContentCode;
    }

    static get NOT_MODIFIED(): number {
        return this.notModifiedCode;
    }

    static get BAD_REQUEST(): number {
        return this.badRequestCode;
    }

    static get UNAUTHORIZED(): number {
        return this.unauthorizedCode;
    }

    static get FORBIDDEN(): number {
        return this.forbiddenCode;
    }

    static get NOT_FOUND(): number {
        return this.notFoundCode;
    }

    static get UNSUPPORTED_MEDIA_TYPE(): number {
        return this.unsupportedMediaTypeCode;
    }

    static get UNPROCESSABLE_ENTITY(): number {
        return this.unprocessableEntityCode;
    }

    static get SERVER_ERROR(): number {
        return this.serverErrorCode;
    }

}

export default StatusCodes;
