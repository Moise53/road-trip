import { PrismaClient, Prisma } from '@prisma/client'
import Travel from '../types/travel'
import { BadRequestError, InternalServerError, NotFoundError } from '../errors/customErrors'

const prisma: PrismaClient = new PrismaClient({
    errorFormat: 'minimal',
})

class TravelModel {
    async create(travel: Travel): Promise<Travel> {
        try {
            const result = await prisma.travel.create({
                data: {
                    user_id: Number(travel.user_id),
                },
            })
            return Travel.fromJson(result)
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

    async getAll(): Promise<Travel[]> {
        try {
            const result = await prisma.travel.findMany()
            return result.map((travel) => Travel.fromJson(travel))
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }

    async getById(id: number): Promise<Travel> {
        try {
            const result = await prisma.travel.findUnique({
                where: {
                    id: id,
                },
            })

            if (!result) {
                throw new NotFoundError('Travel not found')
            }

            return Travel.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async delete(id: number): Promise<Travel> {
        try {
            const result = await prisma.travel.delete({
                where: {
                    id: id,
                },
            })

            if (!result) {
                throw new NotFoundError('Travel not found')
            }

            return Travel.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }
}

export default new TravelModel()