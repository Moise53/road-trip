"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Destination {
    constructor(id, start, end, start_date, end_date, image_url, rating, travel_id, rank) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.start_date = start_date;
        this.end_date = end_date;
        this.image_url = image_url;
        this.rating = rating;
        this.travel_id = travel_id;
        this.rank = rank;
    }
    static fromJson(json) {
        return new Destination(json.id, json.start, json.end, json.start_date, json.end_date, json.image_url, json.rating, json.travel_id, json.rank);
    }
}
exports.default = Destination;
