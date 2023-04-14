"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Destination {
    constructor(id, start, end, travel_id, rank) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.travel_id = travel_id;
        this.rank = rank;
    }
    static fromJson(json) {
        return new Destination(json.id, json.start, json.end, json.travel_id, json.rank);
    }
}
exports.default = Destination;
