"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const travelRouter_1 = __importDefault(require("./routes/travelRouter"));
const destinationRouter_1 = __importDefault(require("./routes/destinationRouter"));
const activityRouter_1 = __importDefault(require("./routes/activityRouter"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/travels', travelRouter_1.default);
app.use('/destinations', destinationRouter_1.default);
app.use('/activities', activityRouter_1.default);
app.use('/users', middlewares_1.Auth, routes_1.userRouter);
app.use('/auth', routes_1.authRouter);
app.use('/search', routes_1.searchRouter);
app.use(middlewares_1.ErrorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
