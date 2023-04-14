import { verifyToken } from "../utils";
import { UnauthorizedError } from "../errors/customErrors";
import { Request, Response, NextFunction } from "express";
import { User } from "../types";
import UserService from "../services/UserService";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req?.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedError('No token provided');
        }

        const decoded: User = await verifyToken(token);
        const userId: number = Number(decoded.id);
        const { data: user, error, message, statusCode } = await UserService.getById(userId);

        if (!user || error || statusCode !== 200 ) {
            throw new UnauthorizedError('Invalid token');
        }

        req.user = User.fromJson(user);
        next();
    } catch (error: any) {
        next(new UnauthorizedError(error.message));
    }
}

export default Auth;