import { Request, Response } from 'express';
import UserService from '../services/UserService';
import User from '../types/user';
import { isIdValid } from '../utils';

class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        const { data, error, message, statusCode } = await UserService.getAll();

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async userSignup(req: Request, res: Response): Promise<void> {
        const user: User = User.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService.signup(user);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async getUserById(req: Request, res: Response): Promise<void> {

        if (!isIdValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }

        const { data, error, message, statusCode } = await UserService.getById(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

    async updateUser(req: Request, res: Response): Promise<void> {

        if (!isIdValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }

        const user: User = User.fromJson(req.body);
        const { data, error, message, statusCode } = await UserService.update(Number(req.params.id), user);

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }
    async deleteUser(req: Request, res: Response): Promise<void> {

        if (!isIdValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }

        const { data, error, message, statusCode } = await UserService.delete(Number(req.params.id));

        if (error) {
            res.status(statusCode).json({ error: message });
            return;
        }

        res.status(statusCode).json({ message, data });
    }

}

export default new UserController();