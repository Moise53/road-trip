"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../types/index");
const activityModel_1 = __importDefault(require("../models/activityModel"));
const statusCode_1 = __importDefault(require("../errors/statusCode"));
class ActivityService {
    async create(activity) {
        try {
            const result = await activityModel_1.default.create(activity);
            return new index_1.OrganizedReturn(result, false, "Activity created successfully", statusCode_1.default.CREATED).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getAll() {
        try {
            const result = await activityModel_1.default.getAll();
            return new index_1.OrganizedReturn(result, false, "Activities retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getById(id) {
        try {
            const result = await activityModel_1.default.getById(id);
            return new index_1.OrganizedReturn(result, false, "Activity retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getByDestinationId(id) {
        try {
            const result = await activityModel_1.default.getByDestinationId(id);
            return new index_1.OrganizedReturn(result, false, "Activities retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async delete(id) {
        try {
            const result = await activityModel_1.default.delete(id);
            return new index_1.OrganizedReturn(result, false, "Activity deleted successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async update(id, activity) {
        try {
            const result = await activityModel_1.default.update(id, activity);
            return new index_1.OrganizedReturn(result, false, "Activity updated successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
}
exports.default = new ActivityService();
