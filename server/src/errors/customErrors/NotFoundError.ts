import StatusCodes from "../statusCode";
class NotFoundError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'NotFound';
        this.status = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;