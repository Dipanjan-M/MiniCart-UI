import { Role } from "./role.model";

export class SignUpResponse {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: Role;

    constructor(id: number, firstName: string, lastName: string, email: string, role: Role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}
