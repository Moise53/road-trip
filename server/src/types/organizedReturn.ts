
class OrganizedReturn {
    constructor(
        public data: any,
        public error: boolean,
        public message: string,
        public statusCode: number
    ) {
        this.data = data
        this.error = error
        this.message = message
        this.statusCode = statusCode
    }

    public toJson(): any {
        return {
            data: this.data,
            error: this.error,
            message: this.message,
            statusCode: this.statusCode
        }
    }
}

export default OrganizedReturn