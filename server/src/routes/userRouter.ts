import express, { Router } from 'express';
import UserController from '../controllers/userController';
const userRouter: Router = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;