import { Activity, OrganizedReturn } from "../types/index"
import activityModel from "../models/activityModel"
import StatusCodes from "../errors/statusCode"
import { STATUS_CODES } from "http"
class ActivityService {
    async create(activity: Activity): Promise<OrganizedReturn> {
        try {
            const result: Activity = await activityModel.create(activity)
            return new OrganizedReturn(result, false, "Activity created successfully", StatusCodes.CREATED).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async getAll(): Promise<OrganizedReturn> {
        try {
            const result: Activity[] = await activityModel.getAll()
            return new OrganizedReturn(result, false, "Activities retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async getById(id: number): Promise<OrganizedReturn> {
        try {
            const result: Activity = await activityModel.getById(id)
            return new OrganizedReturn(result, false, "Activity retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async delete(id: number): Promise<OrganizedReturn> {
        try {
            const result: Activity = await activityModel.delete(id)
            return new OrganizedReturn(result, false, "Activity deleted successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
    async update(id: number, activity: Activity): Promise<OrganizedReturn> {
        try {
            const result: Activity = await activityModel.update(id, activity)
            return new OrganizedReturn(result, false, "Activity updated successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
}

export default new ActivityService()