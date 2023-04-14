"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const utils_1 = require("../../utils");
class UserValidators {
    constructor() {
        this.usernameValidator = (username) => {
            if ((0, lodash_1.isNil)(username) || username === '') {
                return 'Name is required';
            }
            if (username.length < 3) {
                return 'Name must be at least 3 characters long';
            }
            if (username.length > 20) {
                return 'Name must be less than 20 characters long';
            }
            return null;
        };
        this.passwordValidator = (password) => {
            if ((0, lodash_1.isNil)(password) || password === '') {
                return 'Password is required';
            }
            if (password.length < 6) {
                return 'Password must be at least 6 characters long';
            }
            if (password.length > 20) {
                return 'Password must be less than 20 characters long';
            }
            return null;
        };
        this.emailValidator = (email) => {
            if ((0, lodash_1.isNil)(email) || email === '') {
                return 'Email is required';
            }
            if (!(0, lodash_1.isString)(email)) {
                return 'Email must be a string';
            }
            if (!(0, utils_1.isEmailValid)(email)) {
                return 'Email is invalid';
            }
            return null;
        };
        this.userValidator = (user) => {
            const errors = [];
            const usernameError = this.usernameValidator(user.name);
            if (usernameError) {
                errors.push(usernameError);
            }
            const passwordError = this.passwordValidator(user.password);
            if (passwordError) {
                errors.push(passwordError);
            }
            const emailError = this.emailValidator(user.email);
            if (emailError) {
                errors.push(emailError);
            }
            return errors;
        };
    }
}
exports.default = new UserValidators;
