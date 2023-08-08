import OrderItem from "./order_item";

export default class Order{

    private _id: string;
    private _customerId: string;
    private _itens: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, itens: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._itens = itens;
        this._total = this.ITotal();
        this.validate();
    }

    public getTotal(): number{
        return this._total;
    }

    validateId(id: string){
        if(id.length === 0){
            throw new Error("Id is required");
        }
    }

    validateCustomerId(customerId: string){
        if(customerId.length === 0){
            throw new Error("CustomerId is required");
        }
    }

    validateItens(itens: OrderItem[]){
        if(itens.length === 0){
            throw new Error("Itens are required");
        }
    }

    validate(){
        this.validateId(this._id);
        this.validateCustomerId(this._customerId);
        this.validateItens(this._itens);
    }

    ITotal(): number {
        return this._itens.reduce((acc, item) => acc + item.getTotal(), 0);
    }

}