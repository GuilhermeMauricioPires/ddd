import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        this.checkNotification();
    }

    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price;
    }

    validateId(id: string){
        if(id.length === 0){
            this.notification.addError({
                context: "product",
                message: "Id is required"
            })
        }
    }

    validateName(name: string){
        if(name.length === 0){
            this.notification.addError({
                context: "product",
                message: "Name is required"
            })
        }
    }

    validatePrice(price: number){
        if(price < 0){
            this.notification.addError({
                context: "product",
                message: "Price must be greater than zero"
            })
        }
    }

    validate(){
        ProductValidatorFactory.create().validate(this);
        //this.validateId(this._id);
        //this.validateName(this._name);
        //this.validatePrice(this._price);
    }

    changeName(name: string){
        this.validateName(name);
        this.checkNotification();
        this._name = name;
    }

    changePrice(price: number){
        this.validatePrice(price);
        this.checkNotification();
        this._price = price;
    }
}