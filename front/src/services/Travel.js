import axios from 'axios'

const url = "http://localhost:5001"

export async function createTravel(user_id) {
    try {
        const response = await axios.post(`${url}/travels`, { user_id: Number(user_id) }, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, travel: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getTravels() {
    try {
        const response = await axios.get(`${url}/travels`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, travels: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getTravel(_id) {
    try {
        const response = await axios.get(`${url}/travels/${_id}`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, travel: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getTravelByUser(user_id) {
    try {
        const response = await axios.get(`${url}/travels/mytravels`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return { error: false, data: { message, travels: data } }
    } catch (error) {
        console.error(error.message);
        return { error: true, data: error.response.data.error }
    }
}

export async function createDestination(start, end, start_date, end_date, travel_id) {
    try {
        const response = await axios.post(`${url}/destinations`, { start, end, start_date, end_date, travel_id: Number(travel_id), rank: 1 }, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, destination: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getDestinations() {
    try {
        const response = await axios.get(`${url}/destinations`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, destinations: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getDestination(_id) {
    try {
        const response = await axios.get(`${url}/destinations/${_id}`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, destination: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function createActivity(destination_id, name, address, image_url, rating, type, lat, lon) {
    try {
        const response = await axios.post(`${url}/activities`, { name, destination_id: Number(destination_id), address, image_url, rating, type, lat, lon }, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
        const { message, data } = response.data;
        return {error: false, data: {message, activity: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getActivities() {
    try {
        const response = await axios.get(`${url}/activities`)
        const { message, data } = response.data;
        return {error: false, data: {message, activities: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}

export async function getActivityByDestination(destination_id) {
    try {
        const response = await axios.get(`${url}/activities/destination/${Number(destination_id)}`)
        const { message, data } = response.data;
        return {error: false, data: {message, activities: data}}
    } catch (error) {
        console.error(error.message);
        return {error: true, data: error.response.data.error}
    }
}