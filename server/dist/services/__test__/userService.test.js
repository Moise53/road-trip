"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../../types/index");
const UserService_1 = __importDefault(require("../UserService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../../utils");
let userId;
(0, globals_1.describe)('signup module', () => {
    (0, globals_1.test)('user created', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: 'mockpassword',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        console.log(data, error, message, statusCode);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(201);
        (0, globals_1.expect)(message).toEqual('User created successfully');
        (0, globals_1.expect)(data.email).toEqual(user.email);
        (0, globals_1.expect)(data.name).toEqual(user.name);
        (0, globals_1.expect)(bcrypt_1.default.compareSync(user.password, data.password)).toEqual(true);
        // save the id for later use
        userId = data.id;
    });
    (0, globals_1.test)('email already exist', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: 'mockpassword',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Email already in use');
    });
    (0, globals_1.test)('invalid format email', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mocktest.com',
            password: 'mockpassword',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Invalid email');
    });
    (0, globals_1.test)('password is empty', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: '',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Password is required');
    });
    (0, globals_1.test)('password is less than 6 characters', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mock',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Password must be at least 6 characters long');
    });
    (0, globals_1.test)('password is more than 20 characters', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockmockmockmockmockmockmockmockmockmockmockmockmockm',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Password must be less than 20 characters long');
    });
    (0, globals_1.test)('name is empty', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: ''
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Name is required');
    });
    (0, globals_1.test)('name is less than 3 characters', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: 'mo'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Name must be at least 3 characters long');
    });
    (0, globals_1.test)('name is more than 20 characters', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: 'mockmockmockmockmockmockmockmockmockmockmockmockmockm'
        });
        const { data, error, message, statusCode } = await UserService_1.default.signup(user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Name must be less than 20 characters long');
    });
});
(0, globals_1.describe)('login module', () => {
    (0, globals_1.test)('user logged in', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: 'mockpassword',
            name: 'mockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.login(user);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('User logged in successfully');
        (0, globals_1.expect)(data.user.email).toEqual(user.email);
        (0, globals_1.expect)(data.user.name).toEqual(user.name);
        (0, globals_1.expect)(bcrypt_1.default.compareSync(user.password, data.user.password)).toEqual(true);
        // verify the token
        const decoded = (0, utils_1.verifyToken)(data.token);
        (0, globals_1.expect)(decoded.id).toEqual(userId);
        (0, globals_1.expect)(decoded.email).toEqual(user.email);
    });
});
(0, globals_1.describe)('getAll module', () => {
    (0, globals_1.test)('users retrieved', async () => {
        const { data, error, message, statusCode } = await UserService_1.default.getAll();
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Users retrieved successfully');
    });
});
(0, globals_1.describe)('getById module', () => {
    (0, globals_1.test)('user retrieved', async () => {
        const { data, error, message, statusCode } = await UserService_1.default.getById(userId);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Users retrieved successfully');
        (0, globals_1.expect)(data.id).toEqual(userId);
        (0, globals_1.expect)(data.email).toEqual('enzorojoall@gmail.com');
        (0, globals_1.expect)(data.name).toEqual('mockname');
    });
    (0, globals_1.test)('user not found', async () => {
        const { data, error, message, statusCode } = await UserService_1.default.getById(999999999);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(404);
        (0, globals_1.expect)(message).toEqual('User not found');
    });
    // TODO: test if id is not a number
});
(0, globals_1.describe)('update module', () => {
    (0, globals_1.test)('user updated', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: '',
            name: 'updatedMockname'
        });
        const { data, error, message, statusCode } = await UserService_1.default.update(userId, user);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('User updated successfully');
        (0, globals_1.expect)(data.id).toEqual(userId);
        (0, globals_1.expect)(data.email).toEqual('enzorojoall@gmail.com');
        (0, globals_1.expect)(data.name).toEqual('updatedMockname');
    });
    (0, globals_1.test)('user not found', async () => {
        const user = index_1.User.fromJson({
            id: null,
            email: '',
            password: '',
            name: ''
        });
        const { data, error, message, statusCode } = await UserService_1.default.update(999999999, user);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(404);
        (0, globals_1.expect)(message).toEqual('User not found');
    });
    (0, globals_1.test)('email already exist', async () => {
        // create a new user
        const userToCreate = index_1.User.fromJson({
            id: null,
            email: 'enzo.rojo-allendes@epitech.eu',
            password: 'mockpassword',
            name: 'mockname'
        });
        const { data: data1, error: error1, message: message1, statusCode: statusCode1 } = await UserService_1.default.signup(userToCreate);
        // update the user with the same email
        const userToUpdate = index_1.User.fromJson({
            id: null,
            email: 'enzo.rojo-allendes@epitech.eu',
            password: '',
            name: ''
        });
        const { data, error, message, statusCode } = await UserService_1.default.update(userId, userToUpdate);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(400);
        (0, globals_1.expect)(message).toEqual('Email already in use');
    });
});
(0, globals_1.describe)('delete module', () => {
    (0, globals_1.test)('user deleted', async () => {
        const { data, error, message, statusCode } = await UserService_1.default.delete(userId);
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('User deleted successfully');
        (0, globals_1.expect)(data.id).toEqual(userId);
    });
    (0, globals_1.test)('user not found', async () => {
        const { data, error, message, statusCode } = await UserService_1.default.delete(999999999);
        (0, globals_1.expect)(error).toEqual(true);
        (0, globals_1.expect)(statusCode).toEqual(404);
        (0, globals_1.expect)(message).toEqual('User not found');
    });
});
