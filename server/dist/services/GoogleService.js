"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const customErrors_1 = require("../errors/customErrors");
const utils_1 = require("../utils");
const lodash_1 = require("lodash");
class GoogleService {
    async getNearbyPlaces(lat, lng, radius, type, keyword = "", ratings = "", rankBy = "", prices = "") {
        try {
            const result = await axios_1.default.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat} ${lng}${radius && !rankBy.startsWith('distance') ? '&radius=' + radius : ''}&type=${type}${keyword ? '&keyword=' + keyword : ''}${rankBy.startsWith('distance') ? '&rankby=distance' : ''}&key=${(0, utils_1.getGoogleAPIKey)()}`);
            if (result.data.status !== "OK") {
                throw new customErrors_1.InternalServerError("Error retrieving places");
            }
            const places = this.filterResults(result.data.results, ratings, prices, rankBy);
            return new types_1.OrganizedReturn(this.formatPlaces(places), false, "Places retrieved successfully", 200).toJson();
        }
        catch (error) {
            console.error(error);
            return new types_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    async getPlaceDetails(placeId) {
        try {
            const result = await axios_1.default.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,business_status,name,types,user_ratings_total,rating,formatted_phone_number,formatted_address,current_opening_hours,opening_hours,delivery,dine_in,takeout,reservable,photos&key=${(0, utils_1.getGoogleAPIKey)()}`);
            if (result.data.status !== "OK") {
                throw new customErrors_1.InternalServerError("Error retrieving place details");
            }
            return new types_1.OrganizedReturn(this.formatPlaceDetails(result.data.result), false, "Place details retrieved successfully", 200).toJson();
        }
        catch (error) {
            console.error(error);
            return new types_1.OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }
    filterResults(places, ratingFilter, priceFilter, rankBy) {
        if (!(0, lodash_1.isNil)(ratingFilter) || ratingFilter !== "") {
            places = this.filterRatings(places, ratingFilter);
        }
        if (!(0, lodash_1.isNil)(priceFilter) || priceFilter !== "") {
            places = this.filterPrices(places, priceFilter);
        }
        if (!(0, lodash_1.isNil)(rankBy) || rankBy !== "") {
            places = this.filterRankBy(places, rankBy);
        }
        return places;
    }
    filterRankBy(places, rankBy) {
        if ((0, lodash_1.isNil)(rankBy) || rankBy === "") {
            return places;
        }
        switch (rankBy) {
            case "priceAsc":
                return places.sort((a, b) => a.price_level - b.price_level);
            case "priceDesc":
                return places.sort((a, b) => b.price_level - a.price_level);
            case "ratingAsc":
                return places.sort((a, b) => a.rating - b.rating);
            case "ratingDesc":
                return places.sort((a, b) => b.rating - a.rating);
            case "distanceDesc":
                return places.reverse();
            case "distanceAsc":
            default:
                return places;
        }
    }
    filterPrices(places, priceFilter) {
        if ((0, lodash_1.isNil)(priceFilter) || priceFilter === "") {
            return places;
        }
        const prices = priceFilter.split(",").map((price) => Number(price));
        return places.filter((place) => {
            if (prices.length === 0) {
                return true;
            }
            return prices.includes(place.price_level);
        });
    }
    filterRatings(places, ratingFilter) {
        if ((0, lodash_1.isNil)(ratingFilter) || ratingFilter === "") {
            return places;
        }
        const ratings = ratingFilter.split(",").map((rating) => Number(rating));
        return places.filter((place) => {
            if (ratings.length === 0) {
                return true;
            }
            return ratings.includes(Math.floor(place.rating));
        });
    }
    formatPlaceDetails(place) {
        return {
            place_id: place.place_id || null,
            business_status: place.business_status || null,
            name: place.name || null,
            types: place.types || null,
            user_ratings_total: place.user_ratings_total || null,
            rating: place.rating || null,
            phone_number: place.formatted_phone_number || null,
            address: place.formatted_address || null,
            opening_hours: place.current_opening_hours || null,
            delivery: place.delivery || null,
            dine_in: place.dine_in || null,
            takeout: place.takeout || null,
            reservable: place.reservable || null,
            photos: place.photos?.map((photo) => {
                return {
                    photo_reference: photo.photo_reference,
                    link: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}`,
                    height: photo.height,
                    width: photo.width
                };
            })
        };
    }
    formatPlaces(places) {
        return places.map((place) => this.formatPlace(place));
    }
    formatPlace(place) {
        return {
            place_id: place.place_id || null,
            name: place.name || null,
            business_status: place.business_status || null,
            address: place.vicinity || null,
            rating: place.rating || null,
            price_level: place.price_level || null,
            types: place.types || null,
            location: {
                lat: place.geometry?.location?.lat || null,
                lng: place.geometry?.location?.lng || null,
            },
            photos: place.photos?.map((photo) => {
                return {
                    photo_reference: photo.photo_reference,
                    height: photo.height,
                    width: photo.width
                };
            })
        };
    }
}
exports.default = new GoogleService();
