import {describe, expect, test} from '@jest/globals';
import { User } from '../../types/index';
import UserService from '../UserService';
import bcrypt from 'bcrypt';
import { verifyToken } from '../../utils';

let userId: number;

describe('signup module', () => {
    test('user created', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: 'mockpassword',
            name: 'mockname'
        });
        const {data, error, message, statusCode} = await UserService.signup(user);
        console.log(data, error, message, statusCode);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(201);
        expect(message).toEqual('User created successfully');
        expect(data.email).toEqual(user.email);
        expect(data.name).toEqual(user.name);
        expect(bcrypt.compareSync(user.password, data.password)).toEqual(true);

        // save the id for later use
        userId = data.id;

    });

    test('email already exist', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: 'mockpassword',
            name: 'mockname'
        });

        const {data, error, message, statusCode} = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Email already in use');

    });

    test('invalid format email', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mocktest.com',
            password: 'mockpassword',
            name: 'mockname'
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Invalid email');
    });

    test('password is empty', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: '',
            name: 'mockname'
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Password is required');
    });

    test('password is less than 6 characters', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mock',
            name: 'mockname'
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Password must be at least 6 characters long');
    });

    test('password is more than 20 characters', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockmockmockmockmockmockmockmockmockmockmockmockmockm',
            name: 'mockname'
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Password must be less than 20 characters long');
    });

    test('name is empty', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: ''
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Name is required');
    });

    test('name is less than 3 characters', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: 'mo'
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Name must be at least 3 characters long');
    });

    test('name is more than 20 characters', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: 'mockmockmockmockmockmockmockmockmockmockmockmockmockm'
        })
        const { data, error, message, statusCode } = await UserService.signup(user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Name must be less than 20 characters long');
    });
});

describe('login module', () => {
    test('user logged in', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: 'mockpassword',
            name: 'mockname'
        })
        const { data, error, message, statusCode } = await UserService.login(user);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('User logged in successfully');
        expect(data.user.email).toEqual(user.email);
        expect(data.user.name).toEqual(user.name);
        expect(bcrypt.compareSync(user.password, data.user.password)).toEqual(true);
        // verify the token
        const decoded = verifyToken(data.token);
        expect(decoded.id).toEqual(userId);
        expect(decoded.email).toEqual(user.email);
    });
});

describe('getAll module', () => {
    test('users retrieved', async () => {
        const { data, error, message, statusCode } = await UserService.getAll();

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Users retrieved successfully');
    });
});

describe('getById module', () => {
    test('user retrieved', async () => {
        const { data, error, message, statusCode } = await UserService.getById(userId);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Users retrieved successfully');
        expect(data.id).toEqual(userId);
        expect(data.email).toEqual('enzorojoall@gmail.com');
        expect(data.name).toEqual('mockname');
    });

    test('user not found', async () => {
        const { data, error, message, statusCode } = await UserService.getById(999999999);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(404);
        expect(message).toEqual('User not found');
    });

    // TODO: test if id is not a number
});

describe('update module', () => {
    test('user updated', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'enzorojoall@gmail.com',
            password: '',
            name: 'updatedMockname'
        })
        const { data, error, message, statusCode } = await UserService.update(userId, user);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('User updated successfully');
        expect(data.id).toEqual(userId);
        expect(data.email).toEqual('enzorojoall@gmail.com');
        expect(data.name).toEqual('updatedMockname');
    });

    test('user not found', async () => {
        const user: User = User.fromJson({
            id: null,
            email: '',
            password: '',
            name: ''
        })
        const { data, error, message, statusCode } = await UserService.update(999999999, user);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(404);
        expect(message).toEqual('User not found');
    });

    test('email already exist', async () => {

        // create a new user
        const userToCreate: User = User.fromJson({
            id: null,
            email: 'enzo.rojo-allendes@epitech.eu',
            password: 'mockpassword',
            name: 'mockname'
        })
        const { data: data1, error: error1, message: message1, statusCode: statusCode1 } = await UserService.signup(userToCreate);

        // update the user with the same email
        const userToUpdate: User = User.fromJson({
            id: null,
            email: 'enzo.rojo-allendes@epitech.eu',
            password: '',
            name: ''
        })
        const { data, error, message, statusCode } = await UserService.update(userId, userToUpdate);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(400);
        expect(message).toEqual('Email already in use');
    });
});

describe('delete module', () => {
    test('user deleted', async () => {
        const { data, error, message, statusCode } = await UserService.delete(userId);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('User deleted successfully');
        expect(data.id).toEqual(userId);
    });

    test('user not found', async () => {
        const { data, error, message, statusCode } = await UserService.delete(999999999);

        expect(error).toEqual(true);
        expect(statusCode).toEqual(404);
        expect(message).toEqual('User not found');
    });
});
