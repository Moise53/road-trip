class Activity {
    id: string | null;
    name: string;
    address: string;
    city: string;
    postcode: string;
    destination_id: number;
    type: string;
    lat: string;
    lon: string;



    constructor(id: string | null, name: string, address: string, city: string, postcode: string, destination_id: number, type: string, lat: string, lon: string) {
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

    static fromJson(json: any): Activity {
        return new Activity(json.id, json.name, json.address, json.city, json.postcode, json.destination_id, json.type, json.lat, json.lon);
    }
}

export default Activity;