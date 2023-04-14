"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("../types/user"));
const customErrors_1 = require("../errors/customErrors");
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
class UserModel {
    async create(user) {
        try {
            // Validate email with regex
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(user.email)) {
                throw new customErrors_1.BadRequestError('Invalid email');
            }
            const result = await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                },
            });
            return user_1.default.fromJson(result);
        }
        catch (e) {
            console.error(e);
            if (e.name === 'BadRequest') {
                throw e;
            }
            else if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
            const result = await prisma.user.findMany();
            return result.map((user) => user_1.default.fromJson(user));
        }
        catch (e) {
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getById(id) {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('User not found');
            }
            return user_1.default.fromJson(result);
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async getByEmail(email) {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!result) {
                throw new customErrors_1.NotFoundError('User not found');
            }
            return user_1.default.fromJson(result);
        }
        catch (e) {
            if (e.name === 'NotFound') {
                throw e;
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async update(id, data) {
        try {
            const result = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: data.email,
                    name: data.name,
                },
            });
            return result;
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new customErrors_1.BadRequestError('Email already in use');
                }
                else if (e.code === 'P2025') {
                    throw new customErrors_1.NotFoundError('User not found');
                }
                throw new customErrors_1.InternalServerError(e.message);
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
    async delete(id) {
        try {
            const result = await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return result;
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new customErrors_1.NotFoundError('User not found');
                }
                throw new customErrors_1.InternalServerError(e.message);
            }
            throw new customErrors_1.InternalServerError(e.message);
        }
    }
}
exports.default = new UserModel();
