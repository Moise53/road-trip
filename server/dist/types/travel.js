"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Travel {
    constructor(id, user_id) {
        this.id = id;
        this.user_id = user_id;
    }
    static fromJson(json) {
        return new Travel(json.id, json.user_id);
    }
}
exports.default = Travel;
