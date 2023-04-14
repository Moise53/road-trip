"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Activity {
    constructor(id, name, address, city, postcode, destination_id, type, lat, lon) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.postcode = postcode;
        this.destination_id = destination_id;
        this.type = type;
        this.lat = lat;
        this.lon = lon;
    }
    static fromJson(json) {
        return new Activity(json.id, json.name, json.address, json.city, json.postcode, json.destination_id, json.type, json.lat, json.lon);
    }
}
exports.default = Activity;
