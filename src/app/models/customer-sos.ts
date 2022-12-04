export class CustomerSos {
    public custId: number;
    public custFirstName: string;
    public custLastName: string;
    public custEmail: string;

    constructor(custId: number, custFirstName: string, custLastName: string, custEmail: string) {
        this.custId = custId;
        this.custFirstName = custFirstName;
        this.custLastName = custLastName;
        this.custEmail = custEmail;
    }

}

/*
 {
        "custId": 1,
        "custFirstName": "System",
        "custLastName": "Admin",
        "custEmail": "admin@email.com"
    }
    */