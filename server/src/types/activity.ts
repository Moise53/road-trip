class Activity {
    id: string | null;
    name: string;
    address: string;
    image_url: string;
    rating: string;
    destination_id: number;
    type: string;
    lat: string;
    lon: string;



    constructor(id: string | null, name: string, address: string, image_url: string, rating: string, destination_id: number, type: string, lat: string, lon: string) {
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

    static fromJson(json: any): Activity {
        return new Activity(json.id, json.name, json.address, json.image_url, json.rating, json.destination_id, json.type, json.lat, json.lon);
    }
}

export default Activity;