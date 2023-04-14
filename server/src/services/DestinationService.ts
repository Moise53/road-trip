import { Destination, OrganizedReturn } from "../types/index"
import destinationModel from "../models/destinationModel"
import StatusCodes from "../errors/statusCode"
import { STATUS_CODES } from "http"
class DestnationService {
    async create(destination: Destination): Promise<OrganizedReturn> {
        try {
            const result: Destination = await destinationModel.create(destination)
            return new OrganizedReturn(result, false, "Destination created successfully", StatusCodes.CREATED).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async getAll(): Promise<OrganizedReturn> {
        try {
            const result: Destination[] = await destinationModel.getAll()
            return new OrganizedReturn(result, false, "Destinations retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async getById(id: number): Promise<OrganizedReturn> {
        try {
            const result: Destination = await destinationModel.getById(id)
            return new OrganizedReturn(result, false, "Destination retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async delete(id: number): Promise<OrganizedReturn> {
        try {
            const result: Destination = await destinationModel.delete(id)
            return new OrganizedReturn(result, false, "Destination deleted successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async update(id: number, destination: Destination): Promise<OrganizedReturn> {
        try {
            const result: Destination = await destinationModel.update(id, destination)
            return new OrganizedReturn(result, false, "Destination updated successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
}

export default new DestnationService()