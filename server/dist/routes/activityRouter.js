"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityController_1 = __importDefault(require("../controllers/activityController"));
const activityRouter = express_1.default.Router();
activityRouter.get('/', activityController_1.default.getAllActivities);
activityRouter.get('/:id', activityController_1.default.getActivityById);
activityRouter.get('/destination/:id', activityController_1.default.getActivitiesByDestinationId);
activityRouter.delete('/:id', activityController_1.default.deleteActivity);
activityRouter.put('/:id', activityController_1.default.updateActivity);
activityRouter.post('/', activityController_1.default.createActivity);
exports.default = activityRouter;
