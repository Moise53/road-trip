"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const GoogleService_1 = __importDefault(require("../GoogleService"));
(0, globals_1.describe)('GoogleMapService', () => {
    (0, globals_1.test)('getNearbyPlaces', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Places retrieved successfully');
    });
    (0, globals_1.test)('getNearbyPlaces filter rating', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '3,4,5');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Places retrieved successfully');
    });
    (0, globals_1.test)('getNearbyPlaces filter price', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', '', '1,2,3');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Places retrieved successfully');
    });
    (0, globals_1.test)('getNearbyPlaces with rankBy rating', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', 'ratingAsc');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Places retrieved successfully');
    });
    (0, globals_1.test)('getNearbyPlaces with rankBy distance', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', 'distanceAsc');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Places retrieved successfully');
    });
    (0, globals_1.test)('getNearbyPlaces with rankBy price', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getNearbyPlaces(48.86775549309411, 2.3334475040166414, 1000, 'restaurant', 'pizza', '', 'priceAsc', '');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Places retrieved successfully');
    });
    (0, globals_1.test)('getPlaceDetails', async () => {
        const { data, error, message, statusCode } = await GoogleService_1.default.getPlaceDetails('ChIJN1t_tDeuEmsRUsoyG83frY4');
        (0, globals_1.expect)(error).toEqual(false);
        (0, globals_1.expect)(statusCode).toEqual(200);
        (0, globals_1.expect)(message).toEqual('Place details retrieved successfully');
    });
});
