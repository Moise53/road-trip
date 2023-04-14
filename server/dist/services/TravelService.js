"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../types/index");
const travelModel_1 = __importDefault(require("../models/travelModel"));
const statusCode_1 = __importDefault(require("../errors/statusCode"));
class TravelService {
    async create(travel) {
        try {
            const result = await travelModel_1.default.create(travel);
            return new index_1.OrganizedReturn(result, false, "Travel created successfully", statusCode_1.default.CREATED).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getAll() {
        try {
            const result = await travelModel_1.default.getAll();
            return new index_1.OrganizedReturn(result, false, "Travels retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getById(id) {
        try {
            const result = await travelModel_1.default.getById(id);
            return new index_1.OrganizedReturn(result, false, "Travel retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async delete(id) {
        try {
            const result = await travelModel_1.default.delete(id);
            return new index_1.OrganizedReturn(result, false, "Travel deleted successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
}
exports.default = new TravelService();
