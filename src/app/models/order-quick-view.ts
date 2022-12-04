export class OrderQuickView {

    public orderId: number;
    public orderDesc: string;
    public orderDate: string;
    public orderAmt: number;

    constructor(orderId: number, orderDesc: string, orderDate: string, orderAmt: number) {
        this.orderId = orderId;
        this.orderDesc = orderDesc;
        this.orderDate = orderDate;
        this.orderAmt = orderAmt;
    }

}


/**
 *  {
        "orderId": 1,
        "orderDesc": "Shopping on 24th November",
        "orderDate": "2022-11-24",
        "orderAmt": 2024.5
    }
 */