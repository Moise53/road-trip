import { Request, Response, NextFunction } from 'express';
const ErrorHandler = (Error: any, req: Request, res: Response, next: NextFunction) => {
	res.status(Error?.status || 500);
	res.json({
		error: true,
		message: Error?.message || 'Internal Server Error',
    });
};

export default ErrorHandler;