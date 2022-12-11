export default class User {
    email = null as string | null;
    apikey = null as string | null;
    name = null as string | null;

    constructor(email: string, apikey: string, name: string) {
        this.email = email;
        this.apikey = apikey;
        this.name = name;
    }
}