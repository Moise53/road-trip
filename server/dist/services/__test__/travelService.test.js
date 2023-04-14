"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../../types/index");
const TravelService_1 = __importDefault(require("../TravelService"));
const UserService_1 = __importDefault(require("../UserService"));
let travelId;
(0, globals_1.describe)('travel module', () => {
    (0, globals_1.test)('user created', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        const userId = data.id;
        (0, globals_1.test)('travel created', async () => {
            const travel = {
                id: null,
                user_id: userId,
            };
            const { data, error, message, statusCode } = await TravelService_1.default.create(travel);
            (0, globals_1.expect)(error).toEqual(false);
            (0, globals_1.expect)(statusCode).toEqual(201);
            (0, globals_1.expect)(message).toEqual('Travel created successfully');
            (0, globals_1.expect)(data.user_id).toEqual(travel.user_id);
            travelId = data.id;
        });
    });
    (0, globals_1.test)('travel retrieved', async () => {
        const { data, error, message, statusCode } = await TravelService_1.default.getAll();
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Travels retrieved successfully');
    });
    (0, globals_1.test)('travel retrieved by id', async () => {
        const { data, error, message, statusCode } = await TravelService_1.default.getById(travelId);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Travel retrieved successfully');
    });
    (0, globals_1.test)('travel deleted', async () => {
        const { data, error, message, statusCode } = await TravelService_1.default.delete(travelId);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Travel deleted successfully');
    });
});
