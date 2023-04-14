import { PrismaClient, Prisma } from '@prisma/client'
import User from '../types/user'
import { BadRequestError, InternalServerError, NotFoundError } from '../errors/customErrors'
import { isEmailValid } from '../utils'

const prisma: PrismaClient = new PrismaClient({
    errorFormat: 'minimal',
})

class UserModel {
    async create(user: User): Promise<User> {
        try {
            // Validate email with regex
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if (!emailRegex.test(user.email)) {
                throw new BadRequestError('Invalid email')
            }

            const result = await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                },
            })
            return User.fromJson(result)
        } catch (e: any) {
            console.error(e);

            if (e.name === 'BadRequest') {
                throw e
            } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new BadRequestError('Email already in use')
                }
                throw new InternalServerError(e.message)
            }
            throw new InternalServerError(e.message)
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const result = await prisma.user.findMany()
            return result.map((user) => User.fromJson(user))
        } catch (e: any) {
            throw new InternalServerError(e.message)
        }
    }

    async getById(id: number): Promise<User> {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })

            if (!result) {
                throw new NotFoundError('User not found')
            }

            return User.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })

            if (!result) {
                throw new NotFoundError('User not found')
            }

            return User.fromJson(result)
        } catch (e: any) {
            if (e.name === 'NotFound') {
                throw e
            }
            throw new InternalServerError(e.message)
        }
    }

    async update(id: number, data: any): Promise<any> {
        try {
            const result = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: data.email,
                    name: data.name,
                },
            })
            return result
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new BadRequestError('Email already in use')
                } else if (e.code === 'P2025') {
                    throw new NotFoundError('User not found')
                }
                throw new InternalServerError(e.message)
            }
            throw new InternalServerError(e.message)
        }
    }
    async delete(id: number): Promise<any> {
        try {
            const result = await prisma.user.delete({
                where: {
                    id: id,
                },
            })
            return result
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new NotFoundError('User not found')
                }
                throw new InternalServerError(e.message)
            }
            throw new InternalServerError(e.message)
        }
    }
}

export default new UserModel()