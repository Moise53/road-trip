import {describe, expect, test, beforeEach, afterAll, jest} from '@jest/globals';
import GoogleService from '../GoogleService';
import { getGoogleAPIKey } from '../../utils';

describe('GoogleMapService', () => {
    test('getNearbyPlaces', async () => {
        const { data, error, message, statusCode } = await GoogleService.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Places retrieved successfully');
    });

    test('getNearbyPlaces filter rating', async () => {
        const { data, error, message, statusCode } = await GoogleService.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '3,4,5');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Places retrieved successfully');
    });

    test('getNearbyPlaces filter price', async () => {
        const { data, error, message, statusCode } = await GoogleService.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', '', '1,2,3');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Places retrieved successfully');
    });

    test('getNearbyPlaces with rankBy rating', async () => {
        const { data, error, message, statusCode } = await GoogleService.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', 'ratingAsc');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Places retrieved successfully');
    });

    test('getNearbyPlaces with rankBy distance', async () => {
        const { data, error, message, statusCode } = await GoogleService.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', 'distanceAsc');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Places retrieved successfully');
    });

    test('getNearbyPlaces with rankBy price', async () => {
        const { data, error, message, statusCode } = await GoogleService.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', 'priceAsc', '');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Places retrieved successfully');
    });

    test('getPlaceDetails', async () => {
        const {data, error, message, statusCode} = await GoogleService.getPlaceDetails('ChIJN1t_tDeuEmsRUsoyG83frY4');
        expect(error).toEqual(false);
        expect(statusCode).toEqual(200);
        expect(message).toEqual('Place details retrieved successfully');
    });
});

