class Travel {
    id: string | null;
    user_id: string;

    constructor(id: string | null, user_id: string) {
        this.id = id;
        this.user_id = user_id;
    }

    static fromJson(json: any): Travel {
        return new Travel(json.id, json.user_id);
    }
}

export default Travel;