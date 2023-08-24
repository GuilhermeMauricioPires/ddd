import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface{

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price * 2;
        this.validate();
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price;
    }

    validateId(id: string){
        if(id.length === 0){
            throw new Error("Id is required");
        }
    }

    validateName(name: string){
        if(name.length === 0){
            throw new Error("Name is required");
        }
    }

    validatePrice(price: number){
        if(price < 0){
            throw new Error("Price must be greater than zero");
        }
    }

    validate(){
        this.validateId(this._id);
        this.validateName(this._name);
        this.validatePrice(this._price);
    }

    changeName(name: string){
        this.validateName(name);
        this._name = name;
    }

    changePrice(price: number){
        this.validatePrice(price);
        this._price = price;
    }

}