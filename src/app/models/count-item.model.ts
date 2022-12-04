export class CountItem {
    public itemName: string;
    public count: number;
    public unitPrice: number;

    constructor(itemName: string, count: number, unitPrice: number) {
        this.itemName = itemName;
        this.count = count;
        this.unitPrice = unitPrice;
    }

}
