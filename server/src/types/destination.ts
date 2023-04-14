class Destination {
    id: string | null;
    start: string;
    end: string;
    travel_id: string;
    rank: number;

    constructor(id: string | null, start: string, end: string, travel_id: string, rank: number) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.travel_id = travel_id;
        this.rank = rank;
    }

    static fromJson(json: any): Destination {
        return new Destination(json.id, json.start, json.end, json.travel_id, json.rank);
    }
}

export default Destination;