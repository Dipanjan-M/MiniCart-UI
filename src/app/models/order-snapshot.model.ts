import { OrderLineItem } from "./order-line-item.model";

export class OrderSnapshot {

    public orderId: number;
    public orderDescription: string;
    public orderDate: string;
    public orderedItems: OrderLineItem[];

    constructor(orderId: number, orderDescription: string, orderDate: string, orderedItems: OrderLineItem[]) {
        this.orderId = orderId;
        this.orderDescription = orderDescription;
        this.orderDate = orderDate;
        this.orderedItems = orderedItems;
    }

}


/**
 * {
    "orderId": 1,
    "orderDescription": "Shopping on 24th November",
    "orderDate": "2022-11-24",
    "orderedItems": [
        {
            "id": 1,
            "itemName": "Rice",
            "itemQuantity": 1,
            "unitPrice": 550.0
        },
        {
            "id": 2,
            "itemName": "Cookies",
            "itemQuantity": 1,
            "unitPrice": 125.5
        },
        {
            "id": 3,
            "itemName": "T-shirt",
            "itemQuantity": 2,
            "unitPrice": 500.0
        },
        {
            "id": 4,
            "itemName": "Shampoo",
            "itemQuantity": 1,
            "unitPrice": 349.0
        }
    ]
}
 * 
 */