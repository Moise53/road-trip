class User {
    id: string | null;
    name: string;
    email: string;
    password: string;

    constructor(id: string | null, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static fromJson(json: any): User {
        return new User(json.id, json.name, json.email, json.password);
    }

    public toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        };
    }
}

export default User;