"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../types/index");
const userModel_1 = __importDefault(require("../models/userModel"));
const statusCode_1 = __importDefault(require("../errors/statusCode"));
const index_2 = require("../errors/validators/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    async signup(user) {
        try {
            // Validate user
            const errors = index_2.UserValidators.userValidator(user);
            if (errors.length > 0) {
                return new index_1.OrganizedReturn([], true, errors.join(', '), statusCode_1.default.BAD_REQUEST).toJson();
            }
            // Hash password
            const salt = await bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hashSync(user.password, salt);
            // Create user
            const result = await userModel_1.default.create(new index_1.User(null, user.name, user.email, hashedPassword));
            return new index_1.OrganizedReturn(result, false, "User created successfully", statusCode_1.default.CREATED).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async login(user) {
        try {
            // Get user
            const result = await userModel_1.default.getByEmail(user.email);
            if (!result) {
                return new index_1.OrganizedReturn([], true, "User not found", statusCode_1.default.NOT_FOUND).toJson();
            }
            // Check password
            const validPassword = await bcrypt_1.default.compareSync(user.password, result.password);
            if (!validPassword) {
                return new index_1.OrganizedReturn([], true, "Invalid password", statusCode_1.default.BAD_REQUEST).toJson();
            }
            // Create and assign a token
            const token = jsonwebtoken_1.default.sign(result.toJson(), process.env.TOKEN_SECRET);
            return new index_1.OrganizedReturn({ token, user: result }, false, "User logged in successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            console.error(error);
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getAll() {
        try {
            const result = await userModel_1.default.getAll();
            return new index_1.OrganizedReturn(result, false, "Users retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getById(id) {
        try {
            const result = await userModel_1.default.getById(id);
            return new index_1.OrganizedReturn(result, false, "Users retrieved successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async update(id, data) {
        try {
            const result = await userModel_1.default.update(id, data);
            return new index_1.OrganizedReturn(result, false, "User updated successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async delete(id) {
        try {
            const result = await userModel_1.default.delete(id);
            return new index_1.OrganizedReturn(result, false, "User deleted successfully", statusCode_1.default.OK).toJson();
        }
        catch (error) {
            return new index_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
}
exports.default = new UserService();
