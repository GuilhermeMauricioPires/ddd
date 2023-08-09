import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string{
        return this._id;
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
            throw new Error("Id is required");
        }
    }

    validateName(name: string){
        if(name.length === 0){
            throw new Error("Name is required");
        }
    }

    validateAddres(){
        if(this._address === undefined){
            throw new Error("Address is required");
        }
    }

    changeAddress(address: Address){
        this._address = address;
    }

    //intenção de negócio
    changeName(name: string){
        this.validateName(name);
        this._name = name;
    }

    activate() {
        this.validateAddres();
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoint(value: number){
        this._rewardPoints += (value / 2);
    }

}
