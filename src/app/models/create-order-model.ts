import { CountItem } from "./count-item.model";
import { ItemAndQty } from "./item-and-qty";

export class CreateOrderModel {
    public customerId?: number;
    public orderDescription?: string;
    public itemNamesAndCount?: CountItem[];

    constructor(customerId?: number, orderDescription?: string) {
        this.customerId = customerId;
        this.orderDescription = orderDescription;
    }

}
