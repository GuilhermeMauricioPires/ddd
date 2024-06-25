import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
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
        this.validateId(this._id);
        this.validateName(this._name);    
    }

    validateId(id: string){
        if(id.length === 0){
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            })
        }
    }

    validateName(name: string){
        if(name.length === 0){
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            })
        }
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
        this.validateName(name);
        this.checkNotification();
        this._name = name;
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
