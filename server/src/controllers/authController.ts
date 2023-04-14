import { Request, Response } from 'express';
import UserService from '../services/UserService';
import User from '../types/user';

class AuthController {
    async userSignup(req: Request, res: Response): Promise<void> {
        const user: User = User.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService.signup(user);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async userLogin(req: Request, res: Response): Promise<void> {
        const user: User = User.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService.login(user);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, token: data.token, user: data.user });
    }
}

export default new AuthController();