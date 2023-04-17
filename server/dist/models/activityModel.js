"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const activity_1 = __importDefault(require("../types/activity"));
const customErrors_1 = require("../errors/customErrors");
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
class ActivityModel {
    async create(activity) {
        try {
            const result = await prisma.activity.create({
                data: {
                    name: activity.name,
                    address: activity.address,
                    image_url: activity.image_url,
                    rating: activity.rating,
                    destination_id: Number(activity.destination_id),
                    type: client_1.ActivityType[activity.type],
                    lat: activity.lat,
                    lon: activity.lon
                },
            });
            return activity_1.default.fromJson(result);
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
            const result = await prisma.activity.findMany();
            return result.map((activity) => activity_1.default.fromJson(activity));
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getById(id) {
        try {
            const result = await prisma.activity.findUnique({
                where: {
                    id: id,
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Activity not found');
            }
            return activity_1.default.fromJson(result);
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getByDestinationId(destination_id) {
        try {
            const result = await prisma.activity.findMany({
                where: {
                    destination_id: destination_id,
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Activity not found');
            }
            return result.map((activity) => activity_1.default.fromJson(activity));
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
            const result = await prisma.activity.delete({
                where: {
                    id: id,
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Activity not found');
            }
            return activity_1.default.fromJson(result);
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async update(id, activity) {
        try {
            const result = await prisma.activity.update({
                where: {
                    id: id,
                },
                data: {
                    name: activity.name,
                    address: activity.address,
                    image_url: activity.image_url,
                    rating: activity.rating,
                    destination_id: Number(activity.destination_id),
                    type: client_1.ActivityType[activity.type],
                    lat: activity.lat,
                    lon: activity.lon
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('Activity not found');
            }
            return activity_1.default.fromJson(result);
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
}
exports.default = new ActivityModel();
