import { PrismaClient, Prisma } from '@prisma/client'
import Destination from '../types/destination'
import { BadRequestError, InternalServerError, NotFoundError } from '../errors/customErrors'

const prisma: PrismaClient = new PrismaClient({
    errorFormat: 'minimal',
})

class DestinationModel {
    async create(destination: Destination): Promise<Destination> {
        try {
            const result = await prisma.destination.create({
                data: {
                    start: destination.start,
                    end: destination.end,
                    travel_id: Number(destination.travel_id),
                    rank: destination.rank,
                },
            })
            return Destination.fromJson(result)
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


    async getAll(): Promise<any> {
        try {
            const result = await prisma.destination.findMany(
                {
                    include: {
                        activities: true
                    }
                }
            )
            return result
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }


    async getById(id: number): Promise<any> {
        try {
            const result = await prisma.destination.findUnique({
                where: {
                    id: id,
                },
                include: {
                    activities: true
                },
            })

            if (!result) {
                throw new NotFoundError('Destination not found')
            }

            return result
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async delete(id: number): Promise<Destination> {
        try {
            const result = await prisma.destination.delete({
                where: {
                    id: id,
                },
            })
            return Destination.fromJson(result)
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }

    async update(id: number, destination: Destination): Promise<Destination> {
        try {
            const result = await prisma.destination.update({
                where: {
                    id: id,
                },
                data: {
                    start: destination.start,
                    end: destination.end,
                    travel_id: Number(destination.travel_id),
                    rank: destination.rank,
                },
            })
            return Destination.fromJson(result)
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }

    async getByTravelId(travel_id: number): Promise<any> {
        try {
            const result = await prisma.destination.findMany({
                where: {
                    travel_id: travel_id,
                },
                include: {
                    activities: true
                },
            })
            return result
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }

}

export default new DestinationModel()