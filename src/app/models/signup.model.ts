export class Signup {

    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(fName?: string, lName?: string, email?: string, password?: string) {
        this.firstName = fName || '';
        this.lastName = lName || '';
        this.email = email || '';
        this.password = password || '';
    }

}
