import { isNil, isString } from 'lodash';
import { isEmailValid } from '../../utils';
import { User } from '../../types';
class UserValidators {
    private usernameValidator = (username: string) => {
        if (isNil(username) || username === '') {
            return 'Name is required';
        }
        if (username.length < 3) {
            return 'Name must be at least 3 characters long';
        }
        if (username.length > 20) {
            return 'Name must be less than 20 characters long';
        }
        return null;
    }

    private passwordValidator = (password: string) => {
        if (isNil(password) || password === '') {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (password.length > 20) {
            return 'Password must be less than 20 characters long';
        }
        return null;
    }

    private emailValidator = (email: string) => {
        if (isNil(email) || email === '') {
            return 'Email is required';
        }
        if (!isString(email)) {
            return 'Email must be a string';
        }
        if (!isEmailValid(email)) {
            return 'Email is invalid';
        }
        return null;
    }

    public userValidator = (user: User): Array<string> => {
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
    }
}

export default new UserValidators;