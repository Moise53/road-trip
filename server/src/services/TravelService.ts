import { Travel, OrganizedReturn } from "../types/index"
import travelModel from "../models/travelModel"
import StatusCodes from "../errors/statusCode"
import { STATUS_CODES } from "http"
class TravelService {
    async create(travel: Travel): Promise<OrganizedReturn> {
        try {
            const result: Travel = await travelModel.create(travel)
            return new OrganizedReturn(result, false, "Travel created successfully", StatusCodes.CREATED).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async getAll(): Promise<OrganizedReturn> {
        try {
            const result: Travel[] = await travelModel.getAll()
            return new OrganizedReturn(result, false, "Travels retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async getById(id: number): Promise<OrganizedReturn> {
        try {
            const result: Travel = await travelModel.getById(id)
            return new OrganizedReturn(result, false, "Travel retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async getByUserId(id: number): Promise<OrganizedReturn> {
        try {
            const result: [] = await travelModel.getByUserId(id)
            return new OrganizedReturn(result, false, "Travels retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.log(error);
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async delete(id: number): Promise<OrganizedReturn> {
        try {
            const result: Travel = await travelModel.delete(id)
            return new OrganizedReturn(result, false, "Travel deleted successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
}

export default new TravelService()