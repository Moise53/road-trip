import {describe, expect, test} from '@jest/globals';
import { Travel, User } from '../../types/index';
import TravelService from '../TravelService';
import UserService from '../UserService';

let travelId: number;

describe('travel module', () => {
    test('user created', async () => {
        const user: User = User.fromJson({
            id: null,
            email: 'mock@test.com',
            password: 'mockpassword',
            name: 'mockname'
        });
    const {data, error, message, statusCode} = await UserService.signup(user);

    const userId = data.id;

    test('travel created', async () => {


        const travel: Travel = {
            id: null,
            user_id: userId,
        }
        const {data, error, message, statusCode} = await TravelService.create(travel);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(201);
        expect(message).toEqual('Travel created successfully');
        expect(data.user_id).toEqual(travel.user_id);

        travelId = data.id;

    });
});

    test('travel retrieved', async () => {
        const { data, error, message, statusCode } = await TravelService.getAll();

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Travels retrieved successfully');
    });

    test('travel retrieved by id', async () => {
        const { data, error, message, statusCode } = await TravelService.getById(travelId);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Travel retrieved successfully');
    });

    test('travel deleted', async () => {
        const { data, error, message, statusCode } = await TravelService.delete(travelId);

        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Travel deleted successfully');
    });
});