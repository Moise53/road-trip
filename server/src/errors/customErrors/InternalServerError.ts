import StatusCodes from "../statusCode";
class InternalServerError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'InternalServer';
        this.status = StatusCodes.SERVER_ERROR;
    }
}

export default InternalServerError;