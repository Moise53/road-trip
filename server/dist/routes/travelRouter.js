"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelController_1 = __importDefault(require("../controllers/travelController"));
const travelRouter = express_1.default.Router();
travelRouter.post('/', travelController_1.default.createTravel);
travelRouter.get('/', travelController_1.default.getAllTravels);
travelRouter.get('/mytravels', travelController_1.default.getTravelsByUserId);
travelRouter.get('/:id', travelController_1.default.getTravelById);
travelRouter.delete('/:id', travelController_1.default.deleteTravel);
exports.default = travelRouter;
