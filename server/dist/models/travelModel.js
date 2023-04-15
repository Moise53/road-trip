"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const travel_1 = __importDefault(require("../types/travel"));
const customErrors_1 = require("../errors/customErrors");
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
class TravelModel {
    async create(travel) {
        try {
            const result = await prisma.travel.create({
                data: {
                    user_id: Number(travel.user_id),
                },
            });
            return travel_1.default.fromJson(result);
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new customErrors_1.BadRequestError('Email already in use');
                }
                throw new customErrors_1.InternalServerError(e.message);
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getAll() {
        try {
            const result = await prisma.travel.findMany({
                include: {
                    destinations: {
                        include: {
                            activities: true
                        }
                    }
                },
            });
            return result;
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getById(id) {
        try {
            const result = await prisma.travel.findUnique({
                where: {
                    id: id,
                },
                include: {
                    destinations: {
                        include: {
                            activities: true
                        }
                    }
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Travel not found');
            }
            return result;
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getByUserId(id) {
        try {
            const result = await prisma.travel.findMany({
                where: {
                    user_id: id,
                },
                include: {
                    destinations: {
                        include: {
                            activities: true
                        }
                    }
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Travel not found');
            }
            return result;
        }
        catch (e) {
            console.log(e);
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async delete(id) {
        try {
            const result = await prisma.travel.delete({
                where: {
                    id: id,
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Travel not found');
            }
            return travel_1.default.fromJson(result);
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
}
exports.default = new TravelModel();
