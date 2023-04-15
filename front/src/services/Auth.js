import axios from 'axios'

const url = "http://localhost:5001/auth"

export async function loginServices(_email, _password) {
    try {
        const response = await axios.post(`${url}/login`, {
            email: _email,
            password: _password
        })
        const { message, token, user } = response.data;
        return {error: false, data: {message, token, user}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function signupServices(_name, _email, _password) {
    try {
        const response = await axios.post(`${url}/signup`, {
            name: _name,
            email: _email,
            password: _password
        })
        const { message, token, user } = response.data;
        return {error: false, data: {message, token, user}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}