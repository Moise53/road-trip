"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static fromJson(json) {
        return new User(json.id, json.name, json.email, json.password);
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        };
    }
}
exports.default = User;
