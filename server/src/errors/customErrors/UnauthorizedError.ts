import StatusCodes from "../statusCode";
class UnauthorizedError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'Unauthorized';
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthorizedError;