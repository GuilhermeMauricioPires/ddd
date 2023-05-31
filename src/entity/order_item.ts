export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number){
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity
        this.validate();
    }

    public getPrice():number{
        return this._price
    }

    public getTotal(): number{
        return this._price * this._quantity;
    }

    validateId(id: string){
        if(id.length === 0){
            throw new Error("Id is required");
        }
    }

    validateProductId(productId: string){
        if(productId.length === 0){
            throw new Error("ProductId is required");
        }
    }

    validateName(name: string){
        if(name.length === 0){
            throw new Error("Name is required");
        }
    }

    validatePrice(price: number){
        if(price <= 0){
            throw new Error("Price must be greater than zero");
        }
    }

    validateQuantity(quantity: number){
        if(quantity <= 0){
            throw new Error("Quantity must be greater than zero");
        }
    }

    validate(){
        this.validateId(this._id);
        this.validateProductId(this._productId);
        this.validateName(this._name);
        this.validatePrice(this._price);
        this.validateQuantity(this._quantity);
    }

}