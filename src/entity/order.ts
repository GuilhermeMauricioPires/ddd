import OrderItem from "./order_item";

export default class Order{

    _id: string;
    _customerId: string;
    _itens: OrderItem[];
    _total: number;

    constructor(id: string, customerId: string, itens: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._itens = itens;
        this._total = this.ITotal();
    }

    ITotal(): number {
        return this._itens.reduce((acc, item) => acc + item._price, 0);
    }

}