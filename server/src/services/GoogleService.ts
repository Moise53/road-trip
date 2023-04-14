import axios from "axios";
import { OrganizedReturn } from "../types";
import { UnauthorizedError, InternalServerError } from "../errors/customErrors";
import { getGoogleAPIKey } from "../utils";
import { isNil } from "lodash";
class GoogleService {
    public async getNearbyPlaces(
        lat: number,
        lng: number,
        radius: number,
        type: string,
        keyword: string = "",
        ratings: string = "",
        rankBy: string = "",
        prices: string = ""
    ): Promise<OrganizedReturn> {
        try {
            const result = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat} ${lng}${radius && !rankBy.startsWith('distance') ? '&radius='+radius : ''}&type=${type}${keyword ? '&keyword='+keyword : ''}${rankBy.startsWith('distance') ? '&rankby=distance' : ''}&key=${getGoogleAPIKey()}`
            );

            if (result.data.status !== "OK") {
                throw new InternalServerError("Error retrieving places");
            }

            const places = this.filterResults(result.data.results, ratings, prices, rankBy);

            return new OrganizedReturn(this.formatPlaces(places), false, "Places retrieved successfully", 200).toJson();
        } catch (error: any) {
            console.error(error);
            return new OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }

    public async getPlaceDetails(placeId: string): Promise<OrganizedReturn> {
        try {
            const result = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,business_status,name,types,user_ratings_total,rating,formatted_phone_number,formatted_address,current_opening_hours,opening_hours,delivery,dine_in,takeout,reservable,photos&key=${getGoogleAPIKey()}`
            );

            if (result.data.status !== "OK") {
                throw new InternalServerError("Error retrieving place details");
            }

            return new OrganizedReturn(this.formatPlaceDetails(result.data.result), false, "Place details retrieved successfully", 200).toJson();
        } catch (error: any) {
            console.error(error);
            return new OrganizedReturn([], true, error.message, error.status).toJson();
        }
    }

    private     filterResults(places: any[], ratingFilter: string, priceFilter: string, rankBy: string): any[] {

        if (!isNil(ratingFilter) || ratingFilter !== "") {
            places = this.filterRatings(places, ratingFilter);
        }

        if (!isNil(priceFilter) || priceFilter !== "") {
            places = this.filterPrices(places, priceFilter);
        }

        if (!isNil(rankBy) || rankBy !== "") {
            places = this.filterRankBy(places, rankBy);
        }

        return places;
    }

    private filterRankBy(places: any[], rankBy: string): any[] {
        if (isNil(rankBy) || rankBy === "") {
            return places;
        }

        switch (rankBy) {
            case "priceAsc":
                return places.sort((a: any, b: any) => a.price_level - b.price_level);
            case "priceDesc":
                return places.sort((a: any, b: any) => b.price_level - a.price_level);
            case "ratingAsc":
                return places.sort((a: any, b: any) => a.rating - b.rating);
            case "ratingDesc":
                return places.sort((a: any, b: any) => b.rating - a.rating);
            case "distanceDesc":
                return places.reverse();
            case "distanceAsc":
            default:
                return places;
        }
    }

    private filterPrices(places: any[], priceFilter: string): any[] {
        if (isNil(priceFilter) || priceFilter === "") {
            return places;
        }

        const prices = priceFilter.split(",").map((price: string) => Number(price));

        return places.filter((place: any) => {
            if (prices.length === 0) {
                return true;
            }

            return prices.includes(place.price_level);
        });
    }

    private filterRatings(places: any[], ratingFilter: string): any[] {
        if (isNil(ratingFilter) || ratingFilter === "") {
            return places;
        }

        const ratings = ratingFilter.split(",").map((rating: string) => Number(rating));

        return places.filter((place: any) => {
            if (ratings.length === 0) {
                return true;
            }

            return ratings.includes(Math.floor(place.rating));
        });
    }

    private formatPlaceDetails(place: any): any {
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
            photos: place.photos?.map((photo: any) => {
                return {
                    photo_reference: photo.photo_reference,
                    link: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}`,
                    height: photo.height,
                    width: photo.width
                };
            })
        };
    }



    private formatPlaces(places: any[]): any[] {
        return places.map((place: any) => this.formatPlace(place));
    }

    private formatPlace(place: any): any {
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
            photos: place.photos?.map((photo: any) => {
                return {
                    photo_reference: photo.photo_reference,
                    height: photo.height,
                    width: photo.width
                };
            })
        };
    }
}

export default new GoogleService();