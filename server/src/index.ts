import dotenv from 'dotenv';
import express from 'express';
import travelRouter from './routes/travelRouter';
import destinationRouter from './routes/destinationRouter';
import activityRouter from './routes/activityRouter';
import cors from 'cors';
import { userRouter, authRouter, searchRouter } from './routes';
import { Auth, ErrorHandler } from './middlewares';
import { User } from './types';


dotenv.config();

// Add user to request
declare global {
    namespace Express {
      interface Request {
        user: User
      }
    }
}

const app = express();

app.use(express.json());

app.use(cors());
app.use('/travels', Auth, travelRouter);
app.use('/destinations', destinationRouter);
app.use('/activities', activityRouter);
app.use('/users', Auth, userRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);

app.use(ErrorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});