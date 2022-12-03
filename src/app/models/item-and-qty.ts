export class ItemAndQty {
    public name: string;
    public desc: string;
    public price: number;
    public qty: number;

    constructor(name?: string, desc?: string, price?: number, qty?: number) {
        this.name = name!;
        this.desc = desc!;
        this.price = price!;
        this.qty = qty!;
    }
}
