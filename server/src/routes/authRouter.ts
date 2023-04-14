import express, { Router } from 'express';
import AuthController from '../controllers/authController';

const authRouter: Router = express.Router();

authRouter.post('/login', AuthController.userLogin);
authRouter.post('/signup', AuthController.userSignup);

export default authRouter;