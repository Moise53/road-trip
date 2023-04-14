import { isNil, isNaN } from 'lodash';
import jwt from 'jsonwebtoken';

async function isEmailValid(email: string): Promise<any> {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (isNil(email) || email === '' || email === ' ' || !emailRegex.test(email)) {
        return false;
    }
    return true;
}

function isIdValid(id: string): boolean {
    if (isNil(id) || id === '' || id === ' ' || isNaN(Number(id))) {
        return false;
    }
    return true;
}

function verifyToken (token: string): any {
    return jwt.verify(token, process.env.TOKEN_SECRET as string);
}

function getGoogleAPIKey (): string {
    return process.env.GOOGLE_API_KEY as string;
}

export { isEmailValid, isIdValid, verifyToken, getGoogleAPIKey };
