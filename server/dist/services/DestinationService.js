"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../types/index");
const destinationModel_1 = __importDefault(require("../models/destinationModel"));
const statusCode_1 = __importDefault(require("../errors/statusCode"));
class DestnationService {
    async create(destination) {
        try {
            const result = await destinationModel_1.default.create(destination);
            return new index_1.OrganizedReturn(result, false, "Destination created successfully", statusCode_1.default.CREATED).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getAll() {
        try {
            const result = await destinationModel_1.default.getAll();
            return new index_1.OrganizedReturn(result, false, "Destinations retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getById(id) {
        try {
            const result = await destinationModel_1.default.getById(id);
            return new index_1.OrganizedReturn(result, false, "Destination retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async delete(id) {
        try {
            const result = await destinationModel_1.default.delete(id);
            return new index_1.OrganizedReturn(result, false, "Destination deleted successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async update(id, destination) {
        try {
            const result = await destinationModel_1.default.update(id, destination);
            return new index_1.OrganizedReturn(result, false, "Destination updated successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
}
exports.default = new DestnationService();
