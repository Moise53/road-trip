"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Activity {
    constructor(id, name, address, image_url, rating, destination_id, type, lat, lon) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.image_url = image_url;
        this.rating = rating;
        this.destination_id = destination_id;
        this.type = type;
        this.lat = lat;
        this.lon = lon;
    }
    static fromJson(json) {
        return new Activity(json.id, json.name, json.address, json.image_url, json.rating, json.destination_id, json.type, json.lat, json.lon);
    }
}
exports.default = Activity;
