"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const destinationController_1 = __importDefault(require("../controllers/destinationController"));
const destinationRouter = express_1.default.Router();
destinationRouter.get('/', destinationController_1.default.getAllDestinations);
destinationRouter.get('/:id', destinationController_1.default.getDestinationById);
destinationRouter.delete('/:id', destinationController_1.default.deleteDestination);
destinationRouter.put('/:id', destinationController_1.default.updateDestination);
destinationRouter.post('/', destinationController_1.default.createDestination);
exports.default = destinationRouter;
