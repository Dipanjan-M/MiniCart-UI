export class Item {

    public id: number;
    public name: string;
    public description: string;
    public price: number;

    constructor(id?: number, name?: string, description?: string, price?: number) {
        this.id = id!;
        this.name = name!;
        this.description = description!;
        this.price = price!;
    }

}

/**
 * {
        "id": 14,
        "name": "Camera",
        "description": "DSLR camera from Sony",
        "price": 85000.0
    }
 */