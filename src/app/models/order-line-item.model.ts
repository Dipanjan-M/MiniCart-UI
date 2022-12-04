export class OrderLineItem {

    public id: number;
    public itemName: string;
    public itemQuantity: number;
    public unitPrice: number;

    constructor(id: number, itemName: string, itemQuantity: number, unitPrice: number) {
        this.id = id;
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
        this.unitPrice = unitPrice;
    }

}

/**
 * {
            "id": 1,
            "itemName": "Rice",
            "itemQuantity": 1,
            "unitPrice": 550.0
        }
 */