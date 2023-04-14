import StatusCodes from "../statusCode";
class BadRequestError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'BadRequest';
        this.status = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;