"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const destination_1 = __importDefault(require("../types/destination"));
const customErrors_1 = require("../errors/customErrors");
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
class DestinationModel {
    async create(destination) {
        try {
            const result = await prisma.destination.create({
                data: {
                    start: destination.start,
                    end: destination.end,
                    travel_id: Number(destination.travel_id),
                    rank: destination.rank,
                },
            });
            return destination_1.default.fromJson(result);
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
            const result = await prisma.destination.findMany({
                include: {
                    activities: true
                }
            });
            return result;
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getById(id) {
        try {
            const result = await prisma.destination.findUnique({
                where: {
                    id: id,
                },
                include: {
                    activities: true
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Destination not found');
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
    async delete(id) {
        try {
            const result = await prisma.destination.delete({
                where: {
                    id: id,
                },
            });
            return destination_1.default.fromJson(result);
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async update(id, destination) {
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
            });
            return destination_1.default.fromJson(result);
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getByTravelId(travel_id) {
        try {
            const result = await prisma.destination.findMany({
                where: {
                    travel_id: travel_id,
                },
                include: {
                    activities: true
                },
            });
            return result;
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
}
exports.default = new DestinationModel();
