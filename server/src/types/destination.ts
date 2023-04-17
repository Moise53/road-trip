class Destination {
    id: string | null;
    start: string;
    end: string;
    start_date: string;
    end_date: string;
    image_url: string;
    rating: string;
    travel_id: string;
    rank: number;

    constructor(id: string | null, start: string, end: string, start_date: string, end_date: string, image_url: string, rating: string, travel_id: string, rank: number) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.start_date = start_date;
        this.end_date = end_date;
        this.image_url = image_url;
        this.rating = rating;
        this.travel_id = travel_id;
        this.rank = rank;
    }

    static fromJson(json: any): Destination {
        return new Destination(
            json.id,
            json.start,
            json.end,
            json.start_date,
            json.end_date,
            json.image_url,
            json.rating,
            json.travel_id,
            json.rank
        );
    }
}

export default Destination;