import OrderItem from "./order_item";

export default class Order{

    _id: string;
    _customerId: string;
    _itens: OrderItem[];

    constructor(id: string, customerId: string, itens: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._itens = itens;
    }

}