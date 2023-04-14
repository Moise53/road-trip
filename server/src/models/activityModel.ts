import { PrismaClient, Prisma, ActivityType } from '@prisma/client'
import Activity from '../types/activity'
import { BadRequestError, InternalServerError, NotFoundError } from '../errors/customErrors'

const prisma: PrismaClient = new PrismaClient({
    errorFormat: 'minimal',
})

class ActivityModel {
    async create(activity: Activity): Promise<Activity> {
        try {
            const result = await prisma.activity.create({
                data: {
                    name: activity.name,
                    address: activity.address,
                    city: activity.city,
                    postcode: activity.postcode,
                    destination_id: Number(activity.destination_id),
                    type: ActivityType[activity.type as keyof typeof ActivityType],
                    lat: activity.lat,
                    lon: activity.lon
                },
            })
            return Activity.fromJson(result)
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new BadRequestError('Email already in use')
                }
                throw new InternalServerError(e.message)
            }
            throw new InternalServerError(e.message)
        }
    }

    async getAll(): Promise<Activity[]> {
        try {
            const result = await prisma.activity.findMany()
            return result.map((activity) => Activity.fromJson(activity))
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }

    async getById(id: number): Promise<Activity> {
        try {
            const result = await prisma.activity.findUnique({
                where: {
                    id: id,
                },
            })

            if (!result) {
                throw new NotFoundError('Activity not found')
            }

            return Activity.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async delete(id: number): Promise<Activity> {
        try {
            const result = await prisma.activity.delete({
                where: {
                    id: id,
                },
            })

            if (!result) {
                throw new NotFoundError('Activity not found')
            }

            return Activity.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async update(id: number, activity: Activity): Promise<Activity> {
        try {
            const result = await prisma.activity.update({
                where: {
                    id: id,
                },
                data: {
                    name: activity.name,
                    address: activity.address,
                    city: activity.city,
                    postcode: activity.postcode,
                    destination_id: Number(activity.destination_id),
                    type: ActivityType[activity.type as keyof typeof ActivityType],
                    lat: activity.lat,
                    lon: activity.lon
                },
            })

            if (!result) {
                throw new NotFoundError('Activity not found')
            }

            return Activity.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async getByDestinationId(destination_id: number): Promise<Activity[]> {
        try {
            const result = await prisma.activity.findMany({
                where: {
                    destination_id: destination_id,
                },
            })

            if (!result) {
                throw new NotFoundError('Activity not found')
            }

            return result.map((activity) => Activity.fromJson(activity))
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

}

export default new ActivityModel()