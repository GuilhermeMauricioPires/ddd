import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {

    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        super();
        this._id = id;
        this._name = name;
        this.validate();
        this.checkNotification();
    }

    get name(): string{
        return this._name;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }

    get address(): Address{
        return this._address
    }

    get active(): boolean{
        return this._active
    }

    validate(){
        CustomerValidatorFactory.create().validate(this);
    }

    validateAddres(){
        if(this._address === undefined){
            this.notification.addError({
                context: "customer",
                message: "Address is required"
            })
        }
    }

    changeAddress(address: Address){
        this._address = address;
    }

    //intenção de negócio
    changeName(name: string){
        this._name = name;
        this.validate();
        this.checkNotification();        
    }

    activate() {
        this.validateAddres();
        this.checkNotification();
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoint(value: number){
        this._rewardPoints += (value / 2);
    }

}
