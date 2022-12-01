export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName: string;

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, password?: string, roleName?: string) {
        this.id = id!;
        this.firstName = firstName!;
        this.lastName = lastName!;
        this.email = email!;
        this.password = password!;
        this.roleName = roleName!;
    }


}
